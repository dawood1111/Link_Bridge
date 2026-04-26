import * as yup from 'yup';

const SignInSchema =yup.object().shape({
    Email: yup.string().email('Invalid Email Format').required('Email is required'),
    Password: yup.string().min(6,"Password must be at least 6 characters").required('Password is required'),
 });



 const SignUpSchema =yup.object().shape({
    Email: yup.string().email('Invalid Email Format').required('Email is required'),
    Password: yup.string().min(6,"Password must be at least 6 characters").required('Password is required'),
    PhoneNumber:yup.string().min(10,"Phone number must be 10 digits").matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    FirstName:yup.string().required('First Name is required'),
    LastName:yup.string().required('Last Name is required'),
 });

 const QuotationFormSchema=yup.object().shape({
   
 })

 export {SignUpSchema, SignInSchema};
