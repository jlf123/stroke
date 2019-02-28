import { tagSpec as tag } from './tag';
var tagPlugin = {
    nodes: function() {
        return [{ name: 'tag', node: tag }];
    }
};

export default tagPlugin;
