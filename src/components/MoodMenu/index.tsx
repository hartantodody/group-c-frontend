import { useState, useEffect } from "react";
import { Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { fetchPostMood, fetchGetMood } from "../../utils/fetchAPI";
import NeutralMood from "../../../public/neutral.svg";
import HappyMood from "../../../public/happy.svg";
import SadMood from "../../../public/sad.svg";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const MoodMenu = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  useEffect(() => {
    const fetchMoodStatus = async () => {
      try {
        const response = await fetchGetMood();

        if (response.success === true) {
          setSelectedMood(response.data.currentMood);
        }
      } catch (error) {
        console.error("Error fetching mood status:", error);
      }
    };

    fetchMoodStatus();
  }, []);

  const handleMoodSelection = async (mood: string) => {
    try {
      await fetchPostMood({ currentMood: mood });
      setSelectedMood(mood);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission has failed!",
        text: `${error}`,
        confirmButtonText: "OK",
        confirmButtonColor: "#005792",
      });
    }
  };

  const handleShowMoodImg = () => {
    if (selectedMood === "netral") {
      return <CardMedia component='img' width='50' image={NeutralMood} alt='Neutral Mood' />;
    } else if (selectedMood === "happy") {
      return <CardMedia component='img' width='50' image={HappyMood} alt='Happy Mood' />;
    } else if (selectedMood === "sad") {
      return <CardMedia component='img' width='50' image={SadMood} alt='Sad Mood' />;
    } else {
      return <Typography variant='body1'>No Data</Typography>;
    }
  };

  const handleRemoveMood = () => {
    setSelectedMood("");
  };

  return (
    <>
      <img src='public\happy-icon.svg' alt='mood icon' style={{ width: "50px" }}></img>
      <Typography variant='h6'>Daily Mood</Typography>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 300, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Card>
              <CardContent>
                {selectedMood ? (
                  <>
                    <Typography variant='h6' mt={2}>
                      Your mood right now :
                    </Typography>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 100, height: 100, display: "flex", alignItems: "center", padding: 5 }}>
                        {handleShowMoodImg()}
                      </div>
                    </div>
                    <Button variant='text' color='primary' onClick={handleRemoveMood}>
                      <Typography variant='body1' mt={2}>
                        Click here to change your mood
                      </Typography>
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant='h6' gutterBottom>
                      How are you feeling today?
                    </Typography>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={4}>
                        <Button onClick={() => handleMoodSelection("sad")}>
                          <Card sx={{ width: 75 }}>
                            <CardMedia component='img' width='35' image={SadMood} alt='Sad Mood' />
                            <CardContent>
                              <Typography align='center'>Sad</Typography>
                            </CardContent>
                          </Card>
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button onClick={() => handleMoodSelection("netral")}>
                          <Card sx={{ width: 75 }}>
                            <CardMedia component='img' width='35' image={NeutralMood} alt='Neutral Mood' />
                            <CardContent>
                              <Typography align='center'>Neutral</Typography>
                            </CardContent>
                          </Card>
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button onClick={() => handleMoodSelection("happy")}>
                          <Card sx={{ width: 75 }}>
                            <CardMedia component='img' width='35' image={HappyMood} alt='Happy Mood' />
                            <CardContent>
                              <Typography align='center'>Happy</Typography>
                            </CardContent>
                          </Card>
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button onClick={handleExpandClick} variant='outlined' color='primary' className='small-button'>
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
    </>
  );
};

export default MoodMenu;
