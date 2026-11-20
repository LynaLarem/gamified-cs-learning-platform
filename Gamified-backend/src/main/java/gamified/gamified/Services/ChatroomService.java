package gamified.gamified.Services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import gamified.gamified.Entities.Chatroom;
import gamified.gamified.Repositories.ChatroomRepository;

@Service
@Transactional
public class ChatroomService {
    @Autowired
    ChatroomRepository chatroomRepository;

    public List<Chatroom> getAllChatrooms() {
        return chatroomRepository.findAll();
    }

    public List<Chatroom> getStudentChatroom(Long studentId) {
        return chatroomRepository.findAllByStudentId(studentId);
    }

    public List<Chatroom> getChatroomByCourseId(Long coursetId) {
        return chatroomRepository.findByCourseId(coursetId);
    }

    public List<Chatroom> getInstructorChatroom(Long instructorId) {
        return chatroomRepository.findAllByInstructorId(instructorId);
    }

    public List<Chatroom> getChatroomByStudentIdAndCourseId(Long studentId, Long coursetId) {
        return chatroomRepository.findByStudentIdAndCourseId(studentId, coursetId);
    }

    public List<Chatroom> getChatroomByInstructorIdAndCourseId(Long instructorId, Long coursetId) {
        return chatroomRepository.findByInstructorIdAndCourseId(instructorId, coursetId);
    }

    public Chatroom addChatroom(Chatroom chatroom) {
        return chatroomRepository.save(chatroom);
    }

    public Chatroom updateChatroom(Chatroom chatroom) {
        return chatroomRepository.save(chatroom);
    }

    public void deleteChatroomForStudent(Long studentId, Long coursetId) {
        chatroomRepository.deleteByStudentIdAndCourseId(studentId, coursetId);
    }

    public void deleteChatroomForInstructor(Long instructorId, Long coursetId) {
        chatroomRepository.deleteByInstructorIdAndCourseId(instructorId, coursetId);
    }

    public Chatroom getChatroomByStudentIdAndCourseIdAndDate(Long studentId, Long coursetId, Date date){
        return chatroomRepository.findByStudentIdAndCourseIdAndDate(studentId, coursetId, date);
    }

    public Chatroom getChatroomByInstructorIdAndCourseIdAndDate(Long instructorId, Long coursetId, Date date){
        return chatroomRepository.findByInstructorIdAndCourseIdAndDate(instructorId, coursetId, date);
    }
}

