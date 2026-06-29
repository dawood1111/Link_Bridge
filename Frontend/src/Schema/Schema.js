import * as yup from 'yup';

const SignInSchema =yup.object().shape({
    Email: yup.string().email('Invalid Email Format').required('Email is required'),
    Password: yup.string().min(6,"Password must be at least 6 characters").required('Password is required'),
 });



 const SignUpSchema =yup.object().shape({
    email: yup.string().email('Invalid Email Format').required('Email is required'),
    password: yup.string().min(6,"Password must be at least 6 characters").required('Password is required'),
    phoneNumber:yup.string().min(10,"Phone number must be 10 digits").matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
    firstName:yup.string().required('First Name is required'),
    lastName:yup.string().required('Last Name is required'),
    role:        yup.string().required('Role is required'), 
 });

 const QuotationFormSchema=yup.object().shape({ 
      companyHistory:yup.string().required('Company History is required'),
      clientCompany:yup.string().required('Client Company is required'),
      keyAchievements:yup.array().of(yup.string()).min(1, 'At least one Key Achievement is required'),
      financialItems:yup.array().of(yup.object().shape({
        description:yup.string().required('Description is required'),
        unitPrice:yup.number().min(0, 'Unit Price must be positive').required('Unit Price is required'),
      })).min(1, 'At least one Financial Item is required'),
      termsAndConditions:yup.string().required('Terms and Conditions are required'),
      deliveryTimeline: yup.string().required('Delivery Timeline is required'),
      notes:yup.string().required('Notes are required'),  
      paymentTerms:yup.string().required('Payment Terms are required'),
 })

 const ProjectFormSchema = yup.object().shape({
  projectTitle: yup.string().required("Project title is required"),
  projectLocation: yup.string().required("Location is required"),
  projectDescription: yup.string().required("Description is required"),
  projectSize: yup.string().required("Project size is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  projectStatus: yup.string().required("Status is required"),
  projectCategory: yup.string().required("Category is required"),
  minBudget: yup.number()
    .min(0, "Must be positive")
    .required("Min budget is required"),
  maxBudget: yup.number()
    .min(yup.ref("minBudget"), "Max must be greater than min")
    .required("Max budget is required"),
});
 export {SignUpSchema, SignInSchema, QuotationFormSchema, ProjectFormSchema};
