import { Box, Paper, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { styled } from '@mui/material/styles';

const TimelineContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const DateLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(1),
}));

const TimelineStatus = ({ statusHistory }) => {
  return (
    <TimelineContainer elevation={2}>
      <Box sx={{ maxWidth: '100%' }}>
        <Stepper activeStep={statusHistory.length - 1} alternativeLabel>
          {statusHistory.map((item, index) => (
            <Step key={index} completed={true}>
              <StepLabel>
                {item.status}
                <DateLabel>{new Date(item.date).toLocaleDateString()}</DateLabel>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </TimelineContainer>
  );
};

export default TimelineStatus;