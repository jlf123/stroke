const Application = require('spectron').Application
const electronPath = require('electron')
const path = require('path')
const assert = require('assert')
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
chai.should()
chai.use(chaiAsPromised)

describe('Editing Spec', function () {
    this.timeout(60000)

    before(function () {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '..')],
            startTimeout: 20000,
            env: {
                SPECTRON: true,
                ELECTRON_ENABLE_LOGGING: true,
                ELECTRON_ENABLE_STACK_DUMPING: true
            },
            chromeDriverArgs: ['--disable-extensions']
        })
        chaiAsPromised.transferPromiseness = this.app.transferPromiseness
        return this.app.start()
    })

    after(function () {
        if (this.app && this.app.isRunning()) {
            return this.app.stop()
        }
    })

    it('should load the app', function () {
        return this.app.client.getWindowCount().should.eventually.equal(1)
    })

    it('should add a title', function () {
        return this.app.client
            .waitForVisible('#note-title')
            .setValue('#note-title', 'This is a test title')
            .getValue('#note-title')
            .should.eventually.equal('This is a test title')
    })

    it('should add a body', function () {
        return this.app.client
            .waitForVisible('[contenteditable=false]')
            .click('[contenteditable=false]')
            .setValue('[contenteditable=true]', 'This is a test note')
            .getText('[contenteditable=true] p')
            .should.eventually.equal('This is a test note')
    })

    it('should add the note to the left nav', function () {
        const titleSelector =
            '[data-testid=NavigationItem] div:last-child div:first-child'
        return this.app.client
            .waitForVisible(titleSelector)
            .getText(titleSelector)
            .should.eventually.equal('This is a test title')
    })

    it('should create a new note', function () {
        const titleSelector =
            '[data-testid=NavigationItem] div:last-child div:first-child'

        return this.app.client
            .waitForVisible('#addGlobalItem')
            .click('#addGlobalItem')
            .setValue('#note-title', 'This is a second test title')
            .getText(titleSelector)
            .should.eventually.eql([
                'This is a second test title',
                'This is a test title'
            ])
    })

    it('should switch to previous note', function () {
        const previousListItemSelector = '.note-nav-1 button'
        return this.app.client
            .waitForVisible(previousListItemSelector)
            .click(previousListItemSelector)
            .getValue('#note-title')
            .should.eventually.equal('This is a test title')
    })
})
