import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";

const RulesSide = () => {
  return (
    <Paper elevation={1} sx={{ marginTop: "1rem" }}>
      <Box sx={{ backgroundColor: "#333", padding: "1rem" }}>
        <Typography color="white" sx={{ fontWeight: "bold" }}>
          Rules & Regulations
        </Typography>
      </Box>
      <Box sx={{ padding: "1rem" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>1. Be Civil and Respectful</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              There are obvious reasons why we don't allow people to personally
              insult others, and doing so will get you banned. It makes everyone
              feel a little less welcome.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>2. No Racist Language or Behaviour</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Do not post or comment with the purpose of trolling or inciting
              reactions from other users. This will lead to a ban. Don't be
              offensive just to be offensive.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              3. Titles Must be High-Effort and Descriptive
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No posts to communicate with another student. Calling out other
              users is prohibited*.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default RulesSide;
