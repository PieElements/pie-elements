import { assert, stub } from 'sinon';

import Checkbox from 'material-ui/Checkbox';
import RadioButton from 'material-ui/RadioButton';
import React from 'react';
import _ from 'lodash';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import { shallow } from 'enzyme';

describe('ChoiceInput', () => {
  let onChange, wrapper, muiTheme, ChoiceInput;

  beforeEach(() => {
    muiTheme = {
      correctColor: 'green',
      incorrectColor: 'red',
      checkbox: {
        disabledColor: 'grey'
      }
    }
  });

  let mkWrapper = (opts = {}) => {

    opts = _.extend({
      choiceMode: 'checkbox',
      label: 'label',
      displayKey: '1',
      correctness: 'correct',
      value: 'value'
    }, opts);

    return shallow(<ChoiceInput
      {...opts}
      onChange={onChange}
      muiTheme={muiTheme}
    />, {});

  }

  beforeEach(() => {
    ChoiceInput = proxyquire('../src/choice-input', {
    }).ChoiceInput;

    onChange = stub();
    wrapper = mkWrapper();
  });

  describe('render', () => {

    describe('radio', () => {
      beforeEach(() => {
        wrapper = mkWrapper({ choiceMode: 'radio' });
      });

      it('has a .corespring-radio-button class', () => {
        expect(wrapper.hasClass('corespring-radio-button')).to.eql(true);
      });

      it('has a checkbox-holder', () => {
        let holder = wrapper.find('.checkbox-holder');
        expect(holder).to.have.length(1);
      });

      it('sets the label index', () => {
        let rb = wrapper.find(RadioButton);
        expect(rb.prop('label')).to.eql('1. ');
      });

      it('sets the label html', () => {
        let l = wrapper.find('[className="label"]');
        let danger = l.prop('dangerouslySetInnerHTML');
        expect(danger).to.eql({ __html: 'label' });
      });
    });

    describe('checkbox', () => {

      it('has .corespring-checkbox class', () => {
        expect(wrapper.hasClass('corespring-checkbox')).to.eql(true);
      });

      it('has a checkbox-holder', () => {
        let holder = wrapper.find('.checkbox-holder');
        expect(holder).to.have.length(1);
      });

      it('sets the label index', () => {
        let b = wrapper.find(Checkbox);
        expect(b.prop('label')).to.eql('1. ');
      });

      it('sets the label html', () => {
        let l = wrapper.find('[className="label"]');
        let danger = l.prop('dangerouslySetInnerHTML');
        expect(danger).to.eql({ __html: 'label' });
      });
    });
  });

  describe('getTheme', () => {
    it('sets the correct theme.checkbox.disabledColor', () => {
      let checkbox = mkWrapper({ correctness: 'correct' });
      let theme = checkbox.instance().getTheme();
      expect(theme.checkbox.disabledColor).to.eql('green');
    });

    it('sets the incorrect theme.checkbox.disabledColor', () => {
      let checkbox = mkWrapper({ correctness: 'incorrect' });
      let theme = checkbox.instance().getTheme();
      expect(theme.checkbox.disabledColor).to.eql('red');
    });

    it('sets the default theme.checkbox.disabledColor', () => {
      let checkbox = mkWrapper({ correctness: null });
      let theme = checkbox.instance().getTheme();
      expect(theme.checkbox.disabledColor).to.eql('grey');
    });
  });

  describe('onToggleChoice', () => {

    it('calls handler', () => {
      wrapper.instance().onToggleChoice({ target: { checked: true } });
      assert.calledWith(onChange, { value: 'value', selected: true });
    });
  });

});