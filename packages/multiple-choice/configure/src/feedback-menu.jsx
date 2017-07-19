import { blue500, green500, grey500 } from 'material-ui/styles/colors';

import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';

export default function FeedbackMenu(props) {

  const { value, onChange } = props;

  const iconColor = value === 'custom' ?
    green500 :
    (value === 'default' ? blue500 : grey500);

  const tooltip = value === 'custom' ?
    'Custom Feedback' :
    (value === 'default' ? 'Default Feedback' : 'Feedback disabled');

  const icon = <IconButton
    tooltip={tooltip}>
    <ActionFeedback color={iconColor} />
  </IconButton>;

  const chooseFeedback = (t) => {
    return () => {
      onChange(t);
    }
  }

  return <IconMenu
    iconButtonElement={icon}>
    <MenuItem onClick={chooseFeedback('none')} primaryText="No Feedback" />
    <MenuItem onClick={chooseFeedback('default')} primaryText="Default" />
    <MenuItem onClick={chooseFeedback('custom')} primaryText="Custom" />
  </IconMenu>
}    
