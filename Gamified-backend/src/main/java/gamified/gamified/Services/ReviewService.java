package gamified.gamified.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gamified.gamified.Entities.Review;
import gamified.gamified.Repositories.ReviewRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewService {
    @Autowired
    ReviewRepository reviewRepository;

    public Review getReviewByCourseIdAndStudentId(Long courseId, Long studentId) {
        return reviewRepository.findByCourseIdAndStudentId(courseId, studentId);
    }

    public List<Review> getReviewsByCourseId(Long courseId) {
        return reviewRepository.findByCourseId(courseId);
    }

    public List<Review> getAllReview() {
        return reviewRepository.findAll();
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReviewByCourseIdAndStudentId(Long courseId, Long studentId) {
        reviewRepository.deleteByCourseIdAndStudentId(courseId, studentId);
    }

    public Double getAverageRatingByCourseId(Long courseId) {
        return reviewRepository.findAverageRatingByCourseId(courseId);
    }
}
