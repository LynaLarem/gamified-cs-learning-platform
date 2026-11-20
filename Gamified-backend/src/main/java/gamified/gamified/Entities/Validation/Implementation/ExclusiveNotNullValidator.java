package gamified.gamified.Entities.Validation.Implementation;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;

import gamified.gamified.Entities.Validation.Interface.ExclusiveNotNull;

public class ExclusiveNotNullValidator implements ConstraintValidator<ExclusiveNotNull, Object> {
    private String[] fields;

    @Override
    public void initialize(ExclusiveNotNull constraintAnnotation) {
        this.fields = constraintAnnotation.fields();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        int nonNullCount = 0;
        for (String fieldName : fields) {
            try {
                Field field = value.getClass().getDeclaredField(fieldName);
                field.setAccessible(true);
                Object fieldValue = field.get(value);
                if (fieldValue != null) {
                    nonNullCount++;
                }
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new RuntimeException(e);
            }
        }

        return nonNullCount == 1;
    }
}
