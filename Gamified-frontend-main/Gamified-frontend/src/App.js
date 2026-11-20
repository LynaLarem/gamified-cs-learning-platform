import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';

import HomeP from './Dashbooards/HomeP';
import HomePage from './Dashbooards/HomePage';
import Navbar from './Navbar/Navbar';
import Signup from './Signup';


import { SearchProvider } from './Navbar/SearchContext';


import AllCoursesI from './InstructorPages/AllcoursesI';
import CoursestatisticsI from './InstructorPages/CoursestatisticsI';
import InstructorDashboard from './InstructorPages/InstructorDashboard';
import InstructorProfile from './InstructorPages/InstructorProfile';
import MyCoursesI from './InstructorPages/MycoursesI';

import AllCourses from './StudentPages/AllCourses';
import StudentDashboard from './StudentPages/StudentDashboard';
import ViewCourse from './StudentPages/ViewCourse';

import AddedModal from './Modal_Windows/AddedModal';
import CoinsModal from './Modal_Windows/CoinsModal';
import PurchaseModal from './Modal_Windows/PurchaseModal';
import ResumeCourseModal from './Modal_Windows/ResumeCourseModal';
import StudentRoleModal from './Modal_Windows/StudentRoleModal';
import ViewGame from './StudentPages/ViewGame';
import ViewLesson from './StudentPages/ViewLesson';

import CourseLeaderboard from './StudentPages/CourseLeaderboard';
import Leaderboard from './StudentPages/Leaderboard';
import Store from './StudentPages/Store';

import AddStudent from './AdminPages/GStudents/AddStudent';
import AllStudents from './AdminPages/GStudents/AllStudents';
import EditStudent from './AdminPages/GStudents/EditStudent';
import ViewStudent from './AdminPages/GStudents/ViewStudent';

import AddInstructor from './AdminPages/GInstructor/AddInstructor';
import AllInstructors from './AdminPages/GInstructor/AllInstructors';
import EditInstructor from './AdminPages/GInstructor/EditInstructor';
import ViewInstructor from './AdminPages/GInstructor/ViewInstructor';

import AddSpecialist from './AdminPages/GSpecialist/AddSpecialist';
import AllSpecialists from './AdminPages/GSpecialist/AllSpecialists';
import EditSpecialist from './AdminPages/GSpecialist/EditSpecialist';
import ViewSpecialist from './AdminPages/GSpecialist/ViewSpecialist';

import AddChallenge from './AdminPages/GChallenge/AddChallenge';
import AllChallenges from './AdminPages/GChallenge/AllChallenges';
import EditChallenge from './AdminPages/GChallenge/EditChallenge';

import AddItem from './AdminPages/GItems/AddItems';
import AllItems from './AdminPages/GItems/AllItems';
import EditItem from './AdminPages/GItems/EditItem';

import AdminHome from './AdminPages/AdminHome';

import AddCourse from './SpecialistPages/AddCourse';
import AddLevel from './SpecialistPages/AddLevel';
import AddQuest from './SpecialistPages/AddQuest';
import AddStep from './SpecialistPages/AddStep';
import AllCoursesSpecialist from './SpecialistPages/AllCoursesSpecialist';
import EditCourse from './SpecialistPages/EditCourse';
import EditLesson from './SpecialistPages/EditLesson';
import EditLevel from './SpecialistPages/EditLevel';
import EditQuest from './SpecialistPages/EditQuest';
import SpecialistProfile from './SpecialistPages/SpProfile';
import SpecialistDashboard from './SpecialistPages/SpecialistDashboard';
import ViewCourseSpecialist from './SpecialistPages/ViewCourseSpecialist';
import ViewGameSpecialist from './SpecialistPages/ViewGameSpecialist';
import ViewLessonSpecialist from './SpecialistPages/ViewLessonSpecialist';

import Achievements from './StudentPages/Achievements';
import AddReviewForm from './StudentPages/AddReviewForm';
import ChatPage from './StudentPages/ChatPage';
import EditReviewForm from './StudentPages/EditReviewForm';

function App() {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [showAddedModal, setShowAddedModal] = useState(false);
  return (
    <div className="App">
      <SearchProvider>
      <Router>
      <Navbar />
      <StudentRoleModal
              show={showEnrollModal}
              onHide={() => setShowEnrollModal(false)}
              title="Modal Title"
              message="This is the modal message."
            />

      <AddedModal
              show={showAddedModal}
              onHide={() => setShowAddedModal(false)}
              title="Modal Title"
              message="This is the modal message."
            />

      <ResumeCourseModal
              show={showResumeModal}
              onHide={() => setShowResumeModal(false)}
              title="Modal Title"
              message="This is the modal message."
            />
            <PurchaseModal
              show={showPurchaseModal}
              onHide={() => setShowPurchaseModal(false)}
              title="Modal Title"
              message="This is the modal message."
            />

      <CoinsModal
                    show={showCoinsModal}
                    onHide={() => setShowCoinsModal(false)}
                    title="Modal Title"
                    message="This is the modal message."
                  />
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/HomeP" element={<HomeP />} />

          <Route path="/StudentDashboard" element={<StudentDashboard />} />
          <Route path="/InstructorDashboard" element={<InstructorDashboard />} />
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/ViewCourse/:courseId" element={<ViewCourse />} />
          

          <Route path="/ViewLesson/:lessonId" element={<ViewLesson />} />
          <Route path="/ViewGame/:gameId" element={<ViewGame />} />

          <Route path="/AllStudents" element={<AllStudents />} />
          <Route path="/AddStudent" element={<AddStudent />} />
          <Route path="/ViewStudent/:id" element={<ViewStudent />} />
          <Route path="/EditStudent/:id" element={<EditStudent />} />

          <Route path="/AllInstructors" element={<AllInstructors />} />
          <Route path="/AddInstructor" element={<AddInstructor />} />
          <Route path="/ViewInstructor/:id" element={<ViewInstructor />} />
          <Route path="/EditSpecialist/:id" element={<EditSpecialist />} />

          <Route path="/AllSpecialists" element={<AllSpecialists />} />
          <Route path="/AddSpecialist" element={<AddSpecialist />} />
          <Route path="/ViewSpecialist/:id" element={<ViewSpecialist />} />
          <Route path="/EditInstructor/:id" element={<EditInstructor />} />

          <Route path="/AllChallenges" element={<AllChallenges/>} />
          <Route path="/AddChallenge/:type" element={<AddChallenge/>} />
          <Route path="/EditChallenge/:type/:id" element={<EditChallenge/>} />

          <Route path="/AllItems" element={<AllItems />} />
          <Route path="/AddItem" element={<AddItem />} />
          <Route path="/EditItem/:id" element={<EditItem />} />

          <Route path="/AdminHome" element={<AdminHome />} />

          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/SpecialistDashboard" element={<SpecialistDashboard />} />
          <Route path="/AllCoursesSpecialist/:specialistId" element={<AllCoursesSpecialist />} />
          <Route path="/ViewCourseSpecialist/:courseId" element={<ViewCourseSpecialist />} />
          { <Route path="/EditCourse/:courseId" element={<EditCourse />}  /> }
          <Route path="/AddCourse" element={<AddCourse />} />
          <Route path="/AddLevel/:courseId" element={<AddLevel />} />
          {  <Route path="/AddStep/:courseId/:levelId" element={<AddStep />} />}
          <Route path="/EditLevel/:courseId/:levelId" element={<EditLevel />}  /> 
          {  <Route path="/EditLesson/:courseId/:levelId/:stepId" element={<EditLesson />} />}
          <Route path="/ViewLessonSpecialist/:courseId/:levelId/:lessonId" element={<ViewLessonSpecialist />} />
          {  <Route path="/EditQuest/:courseId/:gameId/:questId" element={<EditQuest />} />}
          <Route path="/ViewGameSpecialist/:courseId/:gameId" element={<ViewGameSpecialist />} />
          {  <Route path="/AddQuest/:courseId/:gameId" element={<AddQuest />} />}
          <Route path="/SpecialistProfile" element={<SpecialistProfile />} />


          <Route path="/Store" element={<Store />} />
          <Route path="/Leaderboard" element={<Leaderboard />} />
          <Route path="/CourseLeaderboard" element={<CourseLeaderboard />} />
          <Route path="/AddReviewForm/:courseId" element={<AddReviewForm />}  />
          <Route path="/EditReviewForm/:courseId" element={<EditReviewForm />}  />
          <Route path="/ChatPage" element={<ChatPage />}/>
          <Route path="/Achievements" element={<Achievements />}/>

          <Route path="/AllCoursesI" element={<AllCoursesI />} />
          <Route path="/MyCoursesI" element={<MyCoursesI />} />
          <Route path="/CoursestatisticsI/:courseId" element={<CoursestatisticsI />} />
          <Route path="/CoursestatisticsI/:courseId" element={<CoursestatisticsI />} />
          <Route path="/InstructorProfile" element={<InstructorProfile />} />


        </Routes>
      </Router>
      </SearchProvider>
    </div>
  );
}

export default App;
