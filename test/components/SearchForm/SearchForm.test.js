import {mount} from 'enzyme';
import {expect} from 'chai';
import {Provider} from 'react-redux';

import {ConnectedSearchForm, SearchForm} from '../../../src/components/SearchForm/SearchForm';
import {getStore} from '../../../src/store';

describe('<ConnectedSearchForm />', function () {
    it('должна применяться при нажатии enter в поле ввода и значение поиска должно быть корректным', function () {
        let searchValue;
        const onSubmit = values => searchValue = values.search;
        const searchForm = mount(<Provider store={getStore()}>
            <ConnectedSearchForm form="testSearch" onSubmit={onSubmit}/>
        </Provider>);
        const searchInput = searchForm.find('input');

        searchInput
            .simulate('change', {target: {value: 'test'}})
            .simulate('keyup', {keyCode: SearchForm.ENTER_KEY_CODE});

        expect(searchValue).is.equal('test');
    });
});