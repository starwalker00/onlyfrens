import _ from 'lodash';

const omit = (object: any, name: string) => {
    return _.omit(object, name)
}

export default omit