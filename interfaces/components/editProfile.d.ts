interface IEditProfileFormComponent<P = {}> extends IBaseComp<P> {}

interface IEditProfileFormComponentProps extends IBaseCompProps {}

interface IEditProfileComponentState extends IBaseCompState {
    official_avatar?: string;
    valid_official_avatar?: any;
    valid_avatar?: any;
    avatar?: string;
    birth_date?: string;
    identity_number?: string;
    identity_card_date?: string;
    identity_card_place?: string;
    passport_number?: string;
    passport_experation?: string;
    passport_expiration?: string;
    nationality?: string;
    nick_name?: string;
    other_email?: string;
    skype?: string;
    facebook?: string;
    bank_name?: string;
    bank_account?: string;
    academic_level?: string;
    permanent_address?: string;
    temporary_address?: string;
    tax_identification?: string;
    insurance_number?: string;
    healthcare_provider?: string;
    emergency_contact_name?: string;
    emergency_contact_relationship?: string;
    emergency_contact_number?: string;
    start_date?: string;
    marital_status?: string;
    gender?: string;
    full_name?: string;
    id?: number;
    email?: string;
    phone?: string;
    start_date_official?: string;
    message?: string;
}
