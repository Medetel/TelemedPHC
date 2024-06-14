import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { MenuItem } from './menu.model';
export const MENU: MenuItem[] = [

  {
    label: 'Navigation',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/base/dashboard'
  },
  {
    label: "Admin",
    icon: "book",
    subItems: [
      {
        label: "Users",
        link: "/base/admin/users",
      },
      {
        label: "Roles",
        link: "/base/admin/roles",
      },
      {
        label: "Authorize",
        link: "/base/admin/authorize",
      },
      {
        label: "Change Password",
        link: "/base/admin/changepassword",
      },
    ],
  },
  {
    label: "Manage",
    icon: "book",
    subItems: [
      {
        label: "Country",
        link: "/base/master/country",
      },
      {
        label: "State",
        link: "/base/master/state",
      },
      {
        label: "District",
        link: "/base/master/district",
      },
      {
        label: "Taluk",
        link: "/base/master/taluk",
      },
      {
        label: "Gram",
        link: "/base/master/gram",
      },
      {
        label: "Qualification",
        link: "/base/master/qualification",
      },
      {
        label: "Designation",
        link: "/base/master/designation",
      },
      {
        label: "Discipline",
        link: "/base/master/discipline",
      },
      {
        label: "Specilization",
        link: "/base/master/specilization",
      },
      {
        label: "Skillset",
        link: "/base/master/skillset",
      },
      {
        label: "Network",
        link: "/base/master/network",
      },
      {
        label: "Hospital",
        link: "/base/master/hospital",
      },
      {
        label: "Assistant",
        link: "/base/master/assistant",
      },
      {
        label: "Drugs",
        link: "/base/master/drugs",
      },
      {
        label: "Diagnostic Test",
        link: "/base/master/diagnostic-test",
      },
      {
        label: "Pharmacy",
        link: "/base/master/pharmacy",
      },
      {
        label: "Diagnostic Center",
        link: "/base/master/diagnostic",
      },
      {
        label: "Doctor",
        link: "/base/master/doctor",
      },
      {
        label: "Doctors Schedule",
        link: "/base/master/doctorschedule",
      },
      {
        label: "Doctors Schedule History",
        link: "/base/master/doctorschedulehistory",
      },
    ],
  },
  {
    label: "Registration",
    icon: "book",
    subItems: [
      {
        label: "Doctor Registration",
        link: "/base/registration/doctor",
      },
      {
        label: "Patient Registration",
        link: "/base/registration/patient",
      },
    ],
  },
  {
    label: "Task",
    icon: "book",
    subItems: [
      {
        label: "Appointment",
        link: "/base/task/appointment",
      },
      {
        label: "Manual Appointment",
        link: "/base/task/manualappointment",
        
      },
      {
        label: "Manual Appointment PHC",
        link: "/base/task/manualappointmentphc",
        
      },
      {
        label: "Manual Appointment Approve",
        link: "/base/task/Confirmmanualappointment",
        
      },
      {
        label: "Consultation",
        link: "/base/task/consultation",
      },
    ],
  },
  {
    label: "Doctors Work Bench",
    icon: "book",
    subItems: [
      {
        label: "Manual Appointment Approve",
        link: "/base/task/Confirmmanualappointment",
      },
      {
        label: "Consultation",
        link: "/base/task/consultation",
      },
      {
        label: "Doctors Schedule",
        link: "/base/master/doctorschedule",
      },
      {
        label: "Doctors Schedule History",
        link: "/base/master/doctorschedulehistory",
      },
      {
        label: "Video-Conference",
        link: "/base/master/videoconf",
      },
    ]
  },
  
];