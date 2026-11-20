package gamified.gamified.Entities.Validation.Interface;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.*;

import gamified.gamified.Entities.Validation.Implementation.AtLeastOneNotNullValidator;

@Documented
@Constraint(validatedBy = AtLeastOneNotNullValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface AtLeastOneNotNull {
    String message() default "At least one field must not be null";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String[] fields() default {};
}
