// Speed Dial с типами контактов для добавления

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
  },
}));

function TypesSpeedDial({ onTypeSelect }) {
  const classes = useStyles();

  const addContactTypes = [
    {
      icon: <EmailIcon />,
      name: 'E-mail',
      typeName: 'email'
    },
    {
      icon: <PhoneIcon />,
      name: 'Телефон',
      typeName: 'phone'
    },
  ];
  
  let [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  };

  return (
    <SpeedDial
      ariaLabel="typesSpeedDial"
      className={classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
      direction="up">
      {addContactTypes.map((type) => (
        <SpeedDialAction
          key={type.name}
          icon={type.icon}
          tooltipTitle={type.name}
          onClick={() => {
            handleClose();
            onTypeSelect(type.typeName)
          }}
        />
      ))}
    </SpeedDial>
  );
}

export default TypesSpeedDial;