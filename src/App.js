import React from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import {Close} from '@material-ui/icons'
import theme from './theme/theme'
import Header from './components/Header'
import SeachBar from './components/SeachBar'
import JobCard from './components/Job/JobCard'
import ApplyModal from './components/Job/ApplyModal'
import NewJobModal from './components/Job/NewJobModal'
import { useState, useEffect } from "react";
import { app, firestore } from "./firebase/config";
import ViewJobModal from "./components/Job/ViewJobModal";

export default () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [custom, setCustom] = useState(false)
  const [applyJobData, applyJobPost] = useState({state: false, data: {}})
  const [newJobPost, setNewJobPost] = useState(false)
  const [viewJob, setViewJob] = useState({})

  const fetchJobs = async() => {
    setCustom(false)
    setLoading(true)
    const req = await firestore.collection('jobs').orderBy('postedOn', 'desc').get();
    const tempJobs = req.docs.map((job) => ({...job.data(), id: job.id, postedOn: job.data().postedOn.toDate()}))
    setJobs(tempJobs)
    setLoading(false)
  }

  const fetchJobsCustom = async(jobSearch) => {
    setLoading(true)
    setCustom(true)
    const req = await firestore.collection('jobs').orderBy('postedOn', 'desc')
    .where('location', '==', jobSearch.location)
    .where('type', '==', jobSearch.type)
    .get();
    const tempJobs = req.docs.map((job) => ({...job.data(), id: job.id, postedOn: job.data().postedOn.toDate()}))
    setJobs(tempJobs)
    setLoading(false)

  }

  const postJob = async(jobDetails) => {
    await firestore.collection('jobs').add({
      ...jobDetails, 
      postedOn: app.firestore.FieldValue.serverTimestamp()
    })
    fetchJobs();
  }

  const postApplication = async(applicationDetails) => {
    await firestore.collection('applications').add({
      ...applicationDetails, 
      postedOn: app.firestore.FieldValue.serverTimestamp()
    })
    fetchJobs();
  }

  useEffect(() => {
    fetchJobs();
  }, [])
  return <ThemeProvider theme={theme}>
    <Header openNewJobPost={() => setNewJobPost(true)}/>
    <ApplyModal
        closeApplyModal={() => applyJobPost({state: false, data: {}})}
        applyJobData={applyJobData}
        postApplication={postApplication}
    />
    <NewJobModal closeJobPost={() => setNewJobPost(false)}
    newJobPost={newJobPost} postJob={postJob}/>
    <ViewJobModal job={viewJob} closeModal={() => setViewJob({})}/>
    <Box mb={3}>
      <Grid container justify='center'>
        <Grid item xs={10}>
          <SeachBar fetchJobsCustom={fetchJobsCustom}/>
          { loading? (
            <Box display='flex' justifyContent='center'><CircularProgress/></Box>
          ): ( 
            <>
            { custom && 
            (<Box my={2} display='flex' justifyContent='flex-end'>
              <Button onClick={fetchJobs}>
                <Close color='black' size={20}/> Custom Search
              </Button>
            </Box>
            )}
            {jobs.map((job) => (<JobCard open ={() =>setViewJob(job)} key={job.id} {...job} openApplyModal={() => applyJobPost({state: true, data: job})} />
          ))}
          </>
          )}
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
};
