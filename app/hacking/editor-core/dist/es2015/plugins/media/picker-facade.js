import { MediaPicker, Popup, Browser, Dropzone, Clipboard, BinaryUploader, } from '@atlaskit/media-picker';
var PickerFacade = /** @class */ (function () {
    function PickerFacade(pickerType, config, pickerConfig) {
        var _this = this;
        this.onStartListeners = [];
        this.onDragListeners = [];
        this.handleUploadPreviewUpdate = function (event) {
            var file = event.file, preview = event.preview;
            /** Check if error event occurred even before preview */
            var existingImage = _this.stateManager.getState(file.id);
            if (existingImage && existingImage.status === 'error') {
                return;
            }
            var _a = preview, dimensions = _a.dimensions, scaleFactor = _a.scaleFactor;
            var states = _this.stateManager.newState(file.id, {
                fileName: file.name,
                fileSize: file.size,
                fileMimeType: file.type,
                fileId: file.upfrontId,
                dimensions: dimensions,
                scaleFactor: scaleFactor,
            });
            _this.resolvePublicId(file);
            _this.onStartListeners.forEach(function (cb) { return cb.call(cb, [states]); });
        };
        this.handleUploadEnd = function (event) {
            var file = event.file;
            _this.stateManager.updateState(file.id, {
                status: 'ready',
            });
        };
        this.handleUploadError = function (_a) {
            var error = _a.error;
            if (!error || !error.fileId) {
                var err = new Error("Media: unknown upload-error received from Media Picker: " + (error &&
                    error.name));
                _this.errorReporter.captureException(err);
                return;
            }
            _this.stateManager.updateState(error.fileId, {
                id: error.fileId,
                status: 'error',
                error: error && { description: error.description, name: error.name },
            });
        };
        this.handleCollection = function (event) {
            var file = event.file;
            _this.stateManager.updateState(file.id, {
                status: 'preview',
                collection: file.collectionName,
            });
        };
        this.handleDragEnter = function () {
            _this.onDragListeners.forEach(function (cb) { return cb.call(cb, 'enter'); });
        };
        this.handleDragLeave = function () {
            _this.onDragListeners.forEach(function (cb) { return cb.call(cb, 'leave'); });
        };
        this.pickerType = pickerType;
        this.errorReporter = config.errorReporter;
        this.stateManager = config.stateManager;
        var picker;
        if (pickerType === 'customMediaPicker') {
            picker = this.picker = pickerConfig;
        }
        else {
            picker = this.picker = MediaPicker(pickerType, config.context, pickerConfig);
        }
        picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
        picker.on('upload-end', this.handleUploadEnd);
        picker.on('upload-error', this.handleUploadError);
        picker.on('collection', this.handleCollection);
        if (picker instanceof Dropzone) {
            picker.on('drag-enter', this.handleDragEnter);
            picker.on('drag-leave', this.handleDragLeave);
        }
        if (picker instanceof Dropzone || picker instanceof Clipboard) {
            picker.activate();
        }
    }
    Object.defineProperty(PickerFacade.prototype, "type", {
        get: function () {
            return this.pickerType;
        },
        enumerable: true,
        configurable: true
    });
    PickerFacade.prototype.destroy = function () {
        var picker = this.picker;
        if (!picker) {
            return;
        }
        picker.removeAllListeners('upload-preview-update');
        picker.removeAllListeners('upload-end');
        picker.removeAllListeners('upload-error');
        if (picker instanceof Dropzone) {
            picker.removeAllListeners('drag-enter');
            picker.removeAllListeners('drag-leave');
        }
        this.onStartListeners = [];
        this.onDragListeners = [];
        try {
            if (picker instanceof Dropzone || picker instanceof Clipboard) {
                picker.deactivate();
            }
            if (picker instanceof Popup || picker instanceof Browser) {
                picker.teardown();
            }
        }
        catch (ex) {
            this.errorReporter.captureException(ex);
        }
    };
    PickerFacade.prototype.setUploadParams = function (params) {
        this.picker.setUploadParams(params);
    };
    PickerFacade.prototype.onClose = function (cb) {
        var picker = this.picker;
        if (picker instanceof Popup) {
            picker.on('closed', cb);
            return function () { return picker.off('closed', cb); };
        }
        return function () { };
    };
    PickerFacade.prototype.activate = function () {
        var picker = this.picker;
        if (picker instanceof Dropzone || picker instanceof Clipboard) {
            picker.activate();
        }
    };
    PickerFacade.prototype.deactivate = function () {
        var picker = this.picker;
        if (picker instanceof Dropzone || picker instanceof Clipboard) {
            picker.deactivate();
        }
    };
    PickerFacade.prototype.show = function () {
        if (this.picker instanceof Popup) {
            try {
                this.picker.show();
            }
            catch (ex) {
                this.errorReporter.captureException(ex);
            }
        }
        else if (this.picker instanceof Browser) {
            this.picker.browse();
        }
    };
    PickerFacade.prototype.hide = function () {
        if (this.picker instanceof Popup) {
            this.picker.hide();
        }
    };
    PickerFacade.prototype.cancel = function (id) {
        if (this.picker instanceof Popup) {
            var state = this.stateManager.getState(id);
            if (!state || state.status === 'cancelled') {
                return;
            }
            try {
                this.picker.cancel(id);
            }
            catch (e) {
                // We're deliberately consuming a known Media Picker exception, as it seems that
                // the picker has problems cancelling uploads before the popup picker has been shown
                // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4161
                if (!/((popupIframe|cancelUpload).*?undefined)|(undefined.*?(popupIframe|cancelUpload))/.test("" + e)) {
                    throw e;
                }
            }
            this.stateManager.updateState(id, {
                status: 'cancelled',
            });
        }
    };
    PickerFacade.prototype.upload = function (url, fileName) {
        if (this.picker instanceof BinaryUploader) {
            this.picker.upload(url, fileName);
        }
    };
    PickerFacade.prototype.onNewMedia = function (cb) {
        this.onStartListeners.push(cb);
    };
    PickerFacade.prototype.onDrag = function (cb) {
        this.onDragListeners.push(cb);
    };
    PickerFacade.prototype.resolvePublicId = function (file) {
        var _this = this;
        if (file.upfrontId) {
            file.upfrontId.then(function (data) {
                _this.stateManager.updateState(file.id, {
                    publicId: data,
                    status: 'preview',
                });
            });
        }
    };
    return PickerFacade;
}());
export default PickerFacade;
//# sourceMappingURL=picker-facade.js.map