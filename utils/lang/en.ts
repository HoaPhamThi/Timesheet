export default {
    common: {
        cancel: 'Cancel',
        ok: 'OK',
        page_title: 'Training',
        no_options: 'Empty',
        invalid: 'Invalid',
        register: 'Register',
        email: 'Email Invalid',
        password: 'Your password must be 8-16 characters',
        login_failed: 'Login Failed',
        success: 'Success',
        search: 'Search',
        reset: 'Reset',
        table: {
            total: (total: number) => {
                return `Total ${total} items`;
            },
        },
    },
    login: {
        Sign_into: 'Sign Into Your Account',
        email: 'Email',
        password: 'Password',
    },
    home: {
        title: 'Home',
    },
    modal_request: {
        overtime: 'You are making a request for OVERTIME',
        late_erly: 'You are making a request for Late/Erly',
        leave: 'You are making a request for Leave',
        forget: 'You are making a request for Forget',
    },
    form_register_overtime: {
        title: 'Register OT',
        registrationDate: 'Registration date:',
        otDate: ' Register for date: ',
        checkin: ' Check-in: ',
        checkout: '  Check-out: ',
        requestOT: ' Request OT: ',
        actualOvertime: ' Actual Overtime: ',
        note: ' NOTE: ',
        textnote: ' -Thời gian bắt đầu được tính OT là sau 01:00, sau khi kết thúc làm việc chính thức.',
        exampleNote: ' -Ví dụ: Ca làm việc 08:00 AM đến 17:00 PM thì thời gian OT được tính từ 18:00 PM.',
        reason: 'Reason:',
        importance: '(*)',
        errorTime: 'Thời gian request OT không lớn hơn thời gian Overtime Actual',
    },
    form_detail_notice: {
        title: 'Detail',
        attachment: 'Attachment: ',
    },

    form_forget_check: {
        register_button_cancel: 'Do you want to cancel?',
        register_date_title: 'Registration Date',
        register_for_date_title: 'Register for date',
        check_in_title: 'Check-in',
        check_out_title: 'Check-out',
        late_time_title: 'Late time',
        early_time_title: 'Early time',
        date_cover_up_title: 'Date Cover Up',
        overtime_title: 'Overtime',
        reason_title: 'Reason',
        register: 'Register',
        special_reason_title: 'Special reason',
        check_in_error_msg: 'Check-in not counted as error',
        check_out_error_msg: 'Check-out not counted as error',
    },
    form_register_leave: {
        register_leave: 'Register Leave',
        registration_date: 'Registration date',
        register_for_date: 'Register for date',
        checkin: 'Check-in',
        checkout: 'Check-out',
        work_time: 'Work time',
        lack_time: 'Lack time',
        leave_all_day: 'Leave all day',
        range: 'Range',
        to: 'to',
        paid: 'Paid',
        unpaid: 'Unpaid',
        time_count: 'Time count',
        reason: 'Reason',
        invalid: 'Invalid',
    },
    form_erly_late: {
        register_date_title: 'Registration Date:',
        register_for_date_title: 'Register for date:',
        check_in_title: 'Check-in:',
        check_out_title: 'Check-out:',
        late_time_title: 'Late time:',
        early_time_title: 'Early time:',
        date_cover_up_title: 'Date Cover Up:',
        overtime_title: 'Overtime:',
        reason_title: 'Reason:',
        time_request: ' Time Request: ',
        register: 'Register:',
    },
    changePassWord: {
        change_password: 'Change Password',
        old_password: 'Old Password',
        new_password: 'New Password',
        confirm_password: 'Confirm Password',
        enter_old_password: 'Enter Old Password',
        enter_new_password: 'Enter New Password',
        password_check_characters: 'Password must be equal than 8 characters',
        password_different_old_password: 'New password must be different old password',
        password_incorrect: 'Incorrect password',
    },

    edit_profile: {
        placeholder_birth_date: 'Enter Birth Date',
        placeholder_identity_number: 'Enter Identity Number',
        placeholder_date_issue_dentity: 'Enter Date of issue Identity',
        placeholder_place_issue_identity: 'Enter Place of issue Identity',
        placeholder_passport_number: 'Enter Passport Number',
        placeholder_passport_experation: 'Enter Passport Experation',
        placeholder_nationality: 'Enter Nationality',
        placeholder_nick_name: 'Enter Nick Name',
        placeholder_other_email: 'Enter Other Email',
        placeholder_skype: 'Enter Skype',
        placeholder_facebook: 'Enter Facebook',
        placeholder_bank_name: 'Enter Bank Name',
        placeholder_bank_account: 'Enter Bank Account',
        placeholder_academic_level: 'Enter Academic Level',
        placeholder_permanent_address: 'Enter Permanent Address',
        placeholder_temporary_address: 'Enter Temporary Address',
        placeholder_tax_identification: 'Enter Tax Identification',
        placeholder_insurance_number: 'Enter Insurance Number',
        placeholder_healthcare_provider: 'Enter Healthcare Provider',
        placeholder_emergency_contact_name: 'Enter Emergency Contact Name',
        placeholder_emergency_contact_relationship: 'Enter Emergency Contact Relationship',
        placeholder_emergency_contact_number: 'Enter Emergency Contact Number',
        placeholder_start_date: 'Enter Start Date',

        label_choose_file: 'Choose file',
        label_member_code: 'Member code',
        label_email: 'Email',
        label_name: 'Name',
        label_phone_number: 'Phone number',
        label_gender: 'Gender',
        label_birth_date: 'Birth Date',
        label_identity_number: 'Identity Number',
        label_date_issue_dentity: 'Date of issue Identity',
        label_place_issue_identity: 'Place of issue Identity',
        label_passport_number: 'Passport Number',
        label_passport_experation: 'Passport Experation',
        label_nationality: 'Nationality',
        label_nick_name: 'Nick Name',
        label_other_email: 'Other Email',
        label_skype: 'Skype',
        label_facebook: 'Facebook',
        label_bank_name: 'Bank Name',
        label_bank_account: 'Bank Account',
        label_marital_status: 'Marital Status',
        label_academic_level: 'Academic Level',
        label_permanent_address: 'Permanent Address',
        label_temporary_address: 'Temporary Address',
        label_tax_identification: 'Tax Identification',
        label_insurance_number: 'Insurance Number',
        label_healthcare_provider: 'Healthcare Provider',
        label_emergency_contact_name: 'Emergency Contact Name',
        label_emergency_contact_relationship: 'Emergency Contact Relationship',
        label_emergency_contact_number: 'Emergency Contact Number',
        label_start_date: 'Start Date',

        single: 'Single',
        married: 'Married',
        divorced: 'Divorced',
        other: 'Other',

        female: 'Female',
        male: 'Male',

        my_profile: 'My Proflile',
    },

    worksheet: {
        title: 'My TimeSheet',
        label_list_month: 'Choose from list',
        label_start_end_list: 'Choose start, end',
        label_sort_date: 'Sort by work date',

        this_month: 'This Month',
        last_month: 'Last Month',
        this_year: 'This Year',
        all: 'All',

        asc: 'Ascending',
        desc: 'Descending',
    },

    empty: {
        identity_number: 'Empty Identity Number',
        birth_date: 'Empty Birth Date',
        other_email: 'Empty Other Email',
        bank_name: 'Empty Bank Name',
        bank_account: 'Empty Bank Account',
        nationality: 'Empty Nationality',
        date_of_issue_identity: 'Empty Date of Issue Identity',
        place_of_issue_identity: 'Empty Place of Issue Identity',
        permanent_address: 'Empty Permanent Address',
        temporary_address: 'Empty Temporary Address',
        emegency_contact_name: 'Empty Emegency Contact Name',
        emergency_contact_relationship: 'Empty Emergency Contact Relationship',
        emergency_contact_number: 'Empty Emergency Contact Number',
        email: 'Empty Email',
        password: 'Empty Password',
    },

    valid: {
        exceed_255: 'must not exceed 255 characters',
        exceed_70: 'must not exceed 70 characters',
        exceed_50: 'must not exceed 50 characters',
        exceed_30: 'must not exceed 30 characters',
        exceed_20: 'must not exceed 20 characters',
        exceed_12: 'must not exceed 12 characters',
        min_resolution_500: 'Official Avatar must be over 500x500',
        min_resolution_300: 'Avatar must be over 300x300',
        size_4: 'Upload images < 4MB',
        type_images: 'Image format must be png, jpg',
        email: 'Email Invalid',
    },
};
