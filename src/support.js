import * as _ from "lodash";

function requireAll(requireContext) {
    return _.reduce(requireContext.keys().map(requireContext), _.merge);
}

export {requireAll};