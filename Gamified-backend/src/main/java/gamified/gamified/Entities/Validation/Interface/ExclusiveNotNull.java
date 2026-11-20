package gamified.gamified.Entities.Validation.Interface;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import gamified.gamified.Entities.Validation.Implementation.ExclusiveNotNullValidator;

@Documented
@Constraint(validatedBy = ExclusiveNotNullValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ExclusiveNotNull {
    String message() default "Only one of the fields must not be null";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String[] fields() default {};
}
