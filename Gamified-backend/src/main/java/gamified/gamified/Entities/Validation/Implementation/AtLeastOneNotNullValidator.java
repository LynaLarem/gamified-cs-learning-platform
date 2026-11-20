package gamified.gamified.Entities.Validation.Implementation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;

import gamified.gamified.Entities.Validation.Interface.AtLeastOneNotNull;

public class AtLeastOneNotNullValidator implements ConstraintValidator<AtLeastOneNotNull, Object> {
    private String[] fields;

    @Override
    public void initialize(final AtLeastOneNotNull atLeastOneNotNull) {
        fields = atLeastOneNotNull.fields();
    }

    @Override
    public boolean isValid(final Object object, final ConstraintValidatorContext context) {
        final BeanWrapperImpl beanWrapper = new BeanWrapperImpl(object);

        for (final String field : fields) {
            final Object fieldValue = beanWrapper.getPropertyValue(field);

            if (fieldValue != null) {
                return true;
            }
        }

        return false;
    }
}
