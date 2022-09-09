import { createRef, useEffect, useState } from 'react';

import Input from '../commons/Input';
import Select from '../commons/Select';
import Button from '../commons/Button';
import Validator from '../commons/Validator';

import { fetchMemberDetail, setModal, updateMember } from '@redux/actions';

import { useTrans } from '../../utils/hooks';
import { enums, http, images } from '../../utils/constants';
import { dateHelper, validateHelper } from '../../utils/helpers';
import { useDispatch } from 'react-redux';

const EditProfileForm: IEditProfileFormComponent<IEditProfileFormComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useDispatch();
    const [state, setState] = useState<IEditProfileComponentState>({
        official_avatar: '',
        valid_official_avatar: '',
        valid_avatar: '',
        avatar: '',
        birth_date: '',
        gender: 'Female',
        identity_number: '',
        identity_card_date: '',
        identity_card_place: '',
        passport_number: '',
        passport_experation: '',
        nationality: '',
        nick_name: '',
        other_email: '',
        marital_status: 'Single',
        skype: '',
        facebook: '',
        bank_name: '',
        bank_account: '',
        academic_level: '',
        permanent_address: '',
        temporary_address: '',
        tax_identification: '',
        insurance_number: '',
        healthcare_provider: '',
        emergency_contact_name: '',
        emergency_contact_relationship: '',
        emergency_contact_number: '',
        start_date_official: '01/01/2020',
    });

    const {
        id,
        email,
        full_name,
        phone,
        official_avatar,
        valid_official_avatar,
        valid_avatar,
        marital_status,
        avatar,
        gender,
        birth_date,
        identity_number,
        identity_card_date,
        identity_card_place,
        passport_number,
        passport_experation,
        nationality,
        nick_name,
        other_email,
        skype,
        facebook,
        bank_name,
        bank_account,
        academic_level,
        permanent_address,
        temporary_address,
        tax_identification,
        insurance_number,
        healthcare_provider,
        emergency_contact_name,
        emergency_contact_relationship,
        emergency_contact_number,
        start_date_official,
    } = state;

    const identityNumberValidatorRef = createRef<IValidatorComponentHandle>();
    const nickNameValidatorRef = createRef<IValidatorComponentHandle>();
    const birthDateValidatorRef = createRef<IValidatorComponentHandle>();
    const dateIssueValidatorRef = createRef<IValidatorComponentHandle>();
    const placeIssueValidatorRef = createRef<IValidatorComponentHandle>();
    const passportNumberValidatorRef = createRef<IValidatorComponentHandle>();
    const nationalityValidatorRef = createRef<IValidatorComponentHandle>();
    const otherEmailValidatorRef = createRef<IValidatorComponentHandle>();
    const skypeValidatorRef = createRef<IValidatorComponentHandle>();
    const facebookValidatorRef = createRef<IValidatorComponentHandle>();
    const bankNameValidatorRef = createRef<IValidatorComponentHandle>();
    const bankAccountValidatorRef = createRef<IValidatorComponentHandle>();
    const academicLevelValidatorRef = createRef<IValidatorComponentHandle>();
    const permanentAddressValidatorRef = createRef<IValidatorComponentHandle>();
    const temporaryAddressValidatorRef = createRef<IValidatorComponentHandle>();
    const taxIdentificationValidatorRef = createRef<IValidatorComponentHandle>();
    const insuranceNumberValidatorRef = createRef<IValidatorComponentHandle>();
    const healthcareProviderValidatorRef = createRef<IValidatorComponentHandle>();
    const contactNameValidatorRef = createRef<IValidatorComponentHandle>();
    const contactRelationshipValidatorRef = createRef<IValidatorComponentHandle>();
    const contactNumberValidatorRef = createRef<IValidatorComponentHandle>();
    const officialAvatarValidatorRef = createRef<IValidatorComponentHandle>();
    const avatarValidatorRef = createRef<IValidatorComponentHandle>();

    useEffect(() => {
        handleFetchMemberDetail();
    }, []);

    const handleFetchMemberDetail = () => {
        dispatch(
            fetchMemberDetail((result: IMemberAPIRes | IErrorAPIRes | null) => {
                if (result?.code === http.SUCCESS_CODE) {
                    setState((prevState) => ({
                        ...prevState,
                        id: (result?.data as IMemberAPIRes).data?.id,
                        full_name: (result?.data as IMemberAPIRes).data?.full_name ?? '',
                        email: (result?.data as IMemberAPIRes).data?.email ?? '',
                        phone: (result?.data as IMemberAPIRes).data?.phone ?? '',
                        marital_status: (result?.data as IMemberAPIRes).data?.marital_status ?? '',
                        gender: (result?.data as IMemberAPIRes).data?.gender ?? '',
                        birth_date: (result?.data as IMemberAPIRes).data?.birth_date ?? '',
                        identity_number: (result?.data as IMemberAPIRes).data?.identity_number ?? '',
                        identity_card_date: (result?.data as IMemberAPIRes).data?.identity_card_date ?? '',
                        identity_card_place: (result?.data as IMemberAPIRes).data?.identity_card_place ?? '',
                        passport_number: (result?.data as IMemberAPIRes).data?.passport_number ?? '',
                        passport_experation: (result?.data as IMemberAPIRes).data?.passport_expiration ?? '',
                        nationality: (result?.data as IMemberAPIRes).data?.nationality ?? '',
                        nick_name: (result?.data as IMemberAPIRes).data?.nick_name ?? '',
                        other_email: (result?.data as IMemberAPIRes).data?.other_email ?? '',
                        skype: (result?.data as IMemberAPIRes).data?.skype ?? '',
                        facebook: (result?.data as IMemberAPIRes).data?.facebook ?? '',
                        bank_name: (result?.data as IMemberAPIRes).data?.bank_name ?? '',
                        bank_account: (result?.data as IMemberAPIRes).data?.bank_account ?? '',
                        academic_level: (result?.data as IMemberAPIRes).data?.academic_level ?? '',
                        permanent_address: (result?.data as IMemberAPIRes).data?.permanent_address ?? '',
                        temporary_address: (result?.data as IMemberAPIRes).data?.temporary_address ?? '',
                        tax_identification: (result?.data as IMemberAPIRes).data?.tax_identification ?? '',
                        insurance_number: (result?.data as IMemberAPIRes).data?.insurance_number ?? '',
                        healthcare_provider: (result?.data as IMemberAPIRes).data?.healthcare_provider ?? '',
                        emergency_contact_name: (result?.data as IMemberAPIRes).data?.emergency_contact_name ?? '',
                        emergency_contact_relationship: (result?.data as IMemberAPIRes).data?.emergency_contact_relationship ?? '',
                        emergency_contact_number: (result?.data as IMemberAPIRes).data?.emergency_contact_number ?? '',
                        start_date_official: ((result?.data as IMemberAPIRes).data?.start_date_official as string) ?? '',
                    }));
                } else {
                }
            }),
        );
    };

    const handleOnChange = (field: string, value: string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleChangeOfficialAvatar = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const [file] = e.target.files;
            setState((prevState) => ({
                ...prevState,
                valid_official_avatar: file,
                official_avatar: URL.createObjectURL(file),
            }));
        }
    };

    const handleChangeAvatar = (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const [file] = e.target.files;
            setState((prevState) => ({
                ...prevState,
                valid_avatar: file,
                avatar: URL.createObjectURL(file),
            }));
        }
    };

    const handleUpdateProfile = () => {
        let isValidate = true;

        officialAvatarValidatorRef?.current?.onValidateMessage('');
        if (!validateHelper.isEmpty(valid_official_avatar ?? '')) {
            const img = new Image();
            img.src = URL.createObjectURL(valid_official_avatar);
            img.onload = () => {
                if (img.width < enums.IMAGES.OFFICIAL_AVATAR_RESOLUTION || img.height < enums.IMAGES.OFFICIAL_AVATAR_RESOLUTION) {
                    officialAvatarValidatorRef?.current?.onValidateMessage(`${trans.valid.min_resolution_500}`);
                    isValidate = false;
                }
            };
            if (validateHelper.isSizeAvatar(valid_official_avatar ?? '')) {
                officialAvatarValidatorRef?.current?.onValidateMessage(`${trans.valid.size_4}`);
                isValidate = false;
            } else if (validateHelper.isTypeAvatar(valid_official_avatar ?? '')) {
                officialAvatarValidatorRef?.current?.onValidateMessage(`${trans.valid.type_images}`);
                isValidate = false;
            }
        }

        avatarValidatorRef?.current?.onValidateMessage('');
        if (!validateHelper.isEmpty(valid_avatar ?? '')) {
            const img = new Image();
            img.src = window.URL.createObjectURL(valid_avatar);
            img.onload = () => {
                if (img.width < enums.IMAGES.AVATAR_RESOLUTION || img.height < enums.IMAGES.AVATAR_RESOLUTION) {
                    avatarValidatorRef?.current?.onValidateMessage(`${trans.valid.min_resolution_300}`);
                    isValidate = false;
                }
            };
            if (validateHelper.isSizeAvatar(valid_avatar ?? '')) {
                avatarValidatorRef?.current?.onValidateMessage(`${trans.valid.size_4}`);
                isValidate = false;
            } else if (validateHelper.isTypeAvatar(valid_avatar ?? '')) {
                avatarValidatorRef?.current?.onValidateMessage(`${trans.valid.type_images}`);
                isValidate = false;
            }
        }

        identityNumberValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(identity_number ?? '')) {
            identityNumberValidatorRef?.current?.onValidateMessage(`${trans.empty.identity_number}`);
            isValidate = false;
        } else if ((identity_number ?? '').length > 12) {
            identityNumberValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_identity_number} ${trans.valid.exceed_12}`);
            isValidate = false;
        }

        nickNameValidatorRef?.current?.onValidateMessage('');
        if ((nick_name ?? '').length > 255) {
            nickNameValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_nick_name} ${trans.valid.exceed_255}`);
            isValidate = false;
        }

        birthDateValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(birth_date ?? '')) {
            birthDateValidatorRef?.current?.onValidateMessage(`${trans.empty.birth_date}`);
            isValidate = false;
        }

        dateIssueValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(identity_card_date ?? '')) {
            dateIssueValidatorRef?.current?.onValidateMessage(`${trans.empty.date_of_issue_identity}`);
            isValidate = false;
        }

        placeIssueValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(identity_card_place ?? '')) {
            placeIssueValidatorRef?.current?.onValidateMessage(`${trans.empty.place_of_issue_identity}`);
            isValidate = false;
        } else if ((identity_card_place ?? '').length > 50) {
            placeIssueValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_place_issue_identity} ${trans.valid.exceed_50}`);
            isValidate = false;
        }

        passportNumberValidatorRef?.current?.onValidateMessage('');
        if ((passport_number ?? '').length > 20) {
            passportNumberValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_passport_number} ${trans.valid.exceed_20}`);
            isValidate = false;
        }

        otherEmailValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(other_email ?? '')) {
            otherEmailValidatorRef?.current?.onValidateMessage(`${trans.empty.other_email}`);
            isValidate = false;
        } else if (!validateHelper.isEmail(other_email ?? '')) {
            otherEmailValidatorRef?.current?.onValidateMessage(`${trans.valid.email}`);
            isValidate = false;
        }

        nationalityValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(nationality ?? '')) {
            nationalityValidatorRef?.current?.onValidateMessage(`${trans.empty.nationality}`);
            isValidate = false;
        } else if ((nationality ?? '').length > 50) {
            nationalityValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_nationality} ${trans.valid.exceed_50}`);
            isValidate = false;
        }

        skypeValidatorRef?.current?.onValidateMessage('');
        if ((skype ?? '').length > 50) {
            skypeValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_skype} ${trans.valid.exceed_50}`);
            isValidate = false;
        }

        facebookValidatorRef?.current?.onValidateMessage('');
        if ((facebook ?? '').length > 50) {
            facebookValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_facebook} ${trans.valid.exceed_50}`);
            isValidate = false;
        }

        bankNameValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(bank_name ?? '')) {
            bankNameValidatorRef?.current?.onValidateMessage(`${trans.empty.bank_name}`);
            isValidate = false;
        } else if ((bank_name ?? '').length > 50) {
            bankNameValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_bank_name} ${trans.valid.exceed_50}`);
            isValidate = false;
        }

        bankAccountValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(bank_account ?? '')) {
            bankAccountValidatorRef?.current?.onValidateMessage(`${trans.empty.bank_account}`);
            isValidate = false;
        } else if ((bank_account ?? '').length > 20) {
            bankAccountValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_bank_account} ${trans.valid.exceed_20}`);
            isValidate = false;
        }

        academicLevelValidatorRef?.current?.onValidateMessage('');
        if ((academic_level ?? '').length > 50) {
            academicLevelValidatorRef?.current?.onValidateMessage(`${trans.edit_profile.label_academic_level} ${trans.valid.exceed_50}`);
            isValidate = false;
        }

        permanentAddressValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(permanent_address ?? '')) {
            permanentAddressValidatorRef?.current?.onValidateMessage(`${trans.empty.permanent_address}`);
            isValidate = false;
        } else if ((permanent_address ?? '').length > 255) {
            permanentAddressValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_permanent_address} ${trans.valid.exceed_255}`,
            );
            isValidate = false;
        }

        temporaryAddressValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(temporary_address ?? '')) {
            temporaryAddressValidatorRef?.current?.onValidateMessage(`${trans.empty.temporary_address}`);
            isValidate = false;
        } else if ((temporary_address ?? '').length > 255) {
            temporaryAddressValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_temporary_address} ${trans.valid.exceed_255}`,
            );
            isValidate = false;
        }

        taxIdentificationValidatorRef?.current?.onValidateMessage('');
        if ((tax_identification ?? '').length > 20) {
            taxIdentificationValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_tax_identification} ${trans.valid.exceed_20}`,
            );
            isValidate = false;
        }

        insuranceNumberValidatorRef?.current?.onValidateMessage('');
        if ((insurance_number ?? '').length > 20) {
            insuranceNumberValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_insurance_number} ${trans.valid.exceed_20}`,
            );
            isValidate = false;
        }

        healthcareProviderValidatorRef?.current?.onValidateMessage('');
        if ((healthcare_provider ?? '').length > 50) {
            healthcareProviderValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_healthcare_provider} ${trans.valid.exceed_50}`,
            );
            isValidate = false;
        }

        contactNameValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(emergency_contact_name ?? '')) {
            contactNameValidatorRef?.current?.onValidateMessage(`${trans.empty.emegency_contact_name}`);
            isValidate = false;
        } else if ((emergency_contact_name ?? '').length > 50) {
            contactNameValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_emergency_contact_name} ${trans.valid.exceed_50}`,
            );
            isValidate = false;
        }

        contactRelationshipValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(emergency_contact_relationship ?? '')) {
            contactRelationshipValidatorRef?.current?.onValidateMessage(`${trans.empty.emergency_contact_relationship}`);
            isValidate = false;
        } else if ((emergency_contact_relationship ?? '').length > 50) {
            contactRelationshipValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_emergency_contact_relationship} ${trans.valid.exceed_50}`,
            );
            isValidate = false;
        }

        contactNumberValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(emergency_contact_number ?? '')) {
            contactNumberValidatorRef?.current?.onValidateMessage(`${trans.empty.emergency_contact_number}`);
            isValidate = false;
        } else if ((emergency_contact_number ?? '').length > 20) {
            contactNumberValidatorRef?.current?.onValidateMessage(
                `${trans.edit_profile.label_emergency_contact_number} ${trans.valid.exceed_20}`,
            );
            isValidate = false;
        }

        if (isValidate) {
            const params = {
                valid_avatar,
                marital_status,
                valid_official_avatar,
                gender,
                birth_date,
                identity_number,
                identity_card_date,
                identity_card_place,
                passport_number,
                passport_experation,
                nationality,
                nick_name,
                other_email,
                skype,
                facebook,
                bank_name,
                bank_account,
                academic_level,
                permanent_address,
                temporary_address,
                tax_identification,
                insurance_number,
                healthcare_provider,
                emergency_contact_name,
                emergency_contact_relationship,
                emergency_contact_number,
                start_date_official,
            };

            dispatch(
                updateMember(params, (result: IMemberAPIRes | IErrorAPIRes | null) => {
                    if (result?.code === http.SUCCESS_CODE) {
                        dispatch(
                            setModal({
                                isShow: true,
                                title: trans.common.success,
                                content: (
                                    <div>
                                        <p>{result?.data?.message}</p>
                                    </div>
                                ),
                                buttonText: trans.common.ok,
                                size: 'lg',
                                isHideButtons: true,
                            }),
                        );
                    } else {
                    }
                }),
            );
        }
    };

    return (
        <div className="components__editProfileForm">
            <fieldset className="border border-3 border-dark p-2">
                <legend className="float-none w-auto p-2">
                    <b>{trans.edit_profile.my_profile}</b>
                </legend>
                <div className="row">
                    <div className="col">
                        <Button className="float-end" buttonText="Update" onClick={() => handleUpdateProfile()} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-2 custom-images">
                        {official_avatar ? (
                            <img src={official_avatar} alt="" width={150} />
                        ) : (
                            <img src={images.IMAGES_USERS_PROFILE} alt="" width={150} />
                        )}
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> {trans.edit_profile.label_choose_file}
                        </label>
                        <Validator ref={officialAvatarValidatorRef}>
                            <input
                                id="file-upload"
                                name="upload_cont_img"
                                type="file"
                                className="custom-input"
                                onChange={handleChangeOfficialAvatar}
                            />
                        </Validator>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-2 custom-images align-self-end">
                        {avatar ? <img src={avatar} alt="" width={100} /> : <img src={images.IMAGES_USERS_PROFILE} alt="" width={100} />}
                        <label htmlFor="file-upload1" className="custom-file-upload">
                            <i className="fa fa-cloud-upload"></i> {trans.edit_profile.label_choose_file}
                        </label>
                        <Validator ref={avatarValidatorRef}>
                            <input
                                id="file-upload1"
                                name="upload_cont_img"
                                type="file"
                                className="custom-input"
                                onChange={handleChangeAvatar}
                            />
                        </Validator>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <th>{trans.edit_profile.label_member_code}:</th>
                                    <td>{id}</td>
                                </tr>
                                <tr>
                                    <th>{trans.edit_profile.label_email}:</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th>{trans.edit_profile.label_name}:</th>
                                    <td>{full_name}</td>
                                </tr>
                                <tr>
                                    <th>{trans.edit_profile.label_phone_number}:</th>
                                    <td>{phone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />
                </div>
                <div className="row d-flex justify-content-between">
                    <div className="col-sm-12 col-md-12 col-xl-5">
                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_gender}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Select
                                    onChange={(value: string) => handleOnChange('gender', value)}
                                    value={gender}
                                    options={[
                                        {
                                            value: enums.GENDER.FEMALE.toString(),
                                            label: `${trans.edit_profile.female}`,
                                        },
                                        {
                                            value: enums.GENDER.MALE.toString(),
                                            label: `${trans.edit_profile.male}`,
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_birth_date}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={birthDateValidatorRef}>
                                    <Input
                                        name="birth_date"
                                        type="date"
                                        className="form-control form-control-sm"
                                        value={birth_date}
                                        onChange={(value: string) => handleOnChange('birth_date', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_identity_number}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={identityNumberValidatorRef}>
                                    <Input
                                        type="number"
                                        name="identity_number"
                                        placeholder={trans.edit_profile.placeholder_identity_number}
                                        className="form-control form-control-sm"
                                        value={identity_number}
                                        onChange={(value: string) => handleOnChange('identity_number', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_date_issue_dentity}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={dateIssueValidatorRef}>
                                    <Input
                                        type="date"
                                        name="identity_card_date"
                                        placeholder={trans.edit_profile.placeholder_date_issue_dentity}
                                        value={identity_card_date}
                                        onChange={(value: string) => handleOnChange('identity_card_date', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_place_issue_identity}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={placeIssueValidatorRef}>
                                    <Input
                                        type="text"
                                        name="identity_card_place"
                                        placeholder={trans.edit_profile.placeholder_place_issue_identity}
                                        value={identity_card_place}
                                        onChange={(value: string) => handleOnChange('identity_card_place', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_passport_number}:
                            </label>
                            <div className="col">
                                <Validator ref={passportNumberValidatorRef}>
                                    <Input
                                        type="text"
                                        name="passport_number"
                                        placeholder={trans.edit_profile.placeholder_passport_number}
                                        value={passport_number}
                                        onChange={(value: string) => handleOnChange('passport_number', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_passport_experation}:
                            </label>
                            <div className="col">
                                <Input
                                    type="date"
                                    name="passport_experation"
                                    placeholder={trans.edit_profile.placeholder_passport_experation}
                                    value={passport_experation}
                                    onChange={(value: string) => handleOnChange('passport_experation', value)}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_nationality}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={nationalityValidatorRef}>
                                    <Input
                                        type="text"
                                        name="nationality"
                                        placeholder={trans.edit_profile.placeholder_nationality}
                                        value={nationality}
                                        onChange={(value: string) => handleOnChange('nationality', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-5">
                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_nick_name}:
                            </label>
                            <div className="col">
                                <Validator ref={nickNameValidatorRef}>
                                    <Input
                                        type="text"
                                        name="nick_name"
                                        placeholder={trans.edit_profile.placeholder_nick_name}
                                        value={nick_name}
                                        onChange={(value: string) => handleOnChange('nick_name', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_other_email}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={otherEmailValidatorRef}>
                                    <Input
                                        type="text"
                                        name="other_email"
                                        placeholder={trans.edit_profile.placeholder_other_email}
                                        value={other_email}
                                        onChange={(value: string) => handleOnChange('other_email', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_skype}:
                            </label>
                            <div className="col">
                                <Validator ref={skypeValidatorRef}>
                                    <Input
                                        type="text"
                                        name="skype"
                                        placeholder={trans.edit_profile.placeholder_skype}
                                        value={skype}
                                        onChange={(value: string) => handleOnChange('skype', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_facebook}:
                            </label>
                            <div className="col">
                                <Validator ref={facebookValidatorRef}>
                                    <Input
                                        type="text"
                                        name="facebook"
                                        placeholder={trans.edit_profile.placeholder_facebook}
                                        value={facebook}
                                        onChange={(value: string) => handleOnChange('facebook', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_bank_name}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Select
                                    onChange={(value: string) => handleOnChange('bank_name', value)}
                                    value={bank_name}
                                    isFilter={true}
                                    options={[
                                        {
                                            value: 'Agribank',
                                            label: 'Agribank',
                                        },
                                        {
                                            value: 'MBBank',
                                            label: 'MbBank',
                                        },
                                        {
                                            value: 'Techcombank',
                                            label: 'Techcombank',
                                        },
                                        {
                                            value: 'Viettinbank',
                                            label: 'Viettinbank',
                                        },
                                        {
                                            value: 'BIDV',
                                            label: 'BIDV',
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_bank_account}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={bankAccountValidatorRef}>
                                    <Input
                                        type="text"
                                        name="bank_account"
                                        placeholder={trans.edit_profile.placeholder_bank_account}
                                        value={bank_account}
                                        onChange={(value: string) => handleOnChange('bank_account', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_marital_status}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Select
                                    onChange={(value: string) => handleOnChange('marital_status', value)}
                                    value={marital_status}
                                    options={[
                                        {
                                            value: enums.MARITAL_STATUS.SINGLE.toString(),
                                            label: `${trans.edit_profile.single}`,
                                        },
                                        {
                                            value: enums.MARITAL_STATUS.MARRIED.toString(),
                                            label: `${trans.edit_profile.married}`,
                                        },
                                        {
                                            value: enums.MARITAL_STATUS.DIVORCED.toString(),
                                            label: `${trans.edit_profile.divorced}`,
                                        },
                                        {
                                            value: enums.MARITAL_STATUS.OTHER.toString(),
                                            label: `${trans.edit_profile.other}`,
                                        },
                                    ]}
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width30">
                                {trans.edit_profile.label_academic_level}:
                            </label>
                            <div className="col">
                                <Validator ref={academicLevelValidatorRef}>
                                    <Input
                                        type="text"
                                        name="academic_level"
                                        placeholder={trans.edit_profile.placeholder_academic_level}
                                        value={academic_level}
                                        onChange={(value: string) => handleOnChange('academic_level', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <div className="row mb-3 components__editProfileForm-input">
                            <label className="col-12 col-sm-5 col col-xl-2 col-form-label col-form-label-sm">
                                {trans.edit_profile.label_permanent_address}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col bases__margin--left6">
                                <Validator ref={permanentAddressValidatorRef}>
                                    <Input
                                        name="permanent_address"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder={trans.edit_profile.placeholder_permanent_address}
                                        value={permanent_address}
                                        onChange={(value: string) => handleOnChange('permanent_address', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12">
                        <div className="row mb-3 components__editProfileForm-input">
                            <label className="col-12 col-sm-5 col col-xl-2 col-form-label col-form-label-sm">
                                {trans.edit_profile.label_temporary_address}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col bases__margin--left6">
                                <Validator ref={temporaryAddressValidatorRef}>
                                    <Input
                                        name="temporary_address"
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder={trans.edit_profile.placeholder_temporary_address}
                                        value={temporary_address}
                                        onChange={(value: string) => handleOnChange('temporary_address', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-between">
                    <div className="col-sm-12 col-md-12 col-xl-5">
                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_tax_identification}:
                            </label>
                            <div className="col">
                                <Validator ref={taxIdentificationValidatorRef}>
                                    <Input
                                        type="text"
                                        name="tax_identification"
                                        placeholder={trans.edit_profile.placeholder_tax_identification}
                                        value={tax_identification}
                                        onChange={(value: string) => handleOnChange('tax_identification', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_insurance_number}:
                            </label>
                            <div className="col">
                                <Validator ref={insuranceNumberValidatorRef}>
                                    <Input
                                        type="text"
                                        name="insurance_number"
                                        placeholder={trans.edit_profile.placeholder_insurance_number}
                                        value={insurance_number}
                                        onChange={(value: string) => handleOnChange('insurance_number', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-md-auto col-form-label col-form-label-sm bases__width43">
                                {trans.edit_profile.label_healthcare_provider}:
                            </label>
                            <div className="col">
                                <Validator ref={healthcareProviderValidatorRef}>
                                    <Input
                                        type="text"
                                        name="healthcare_provider"
                                        placeholder={trans.edit_profile.placeholder_healthcare_provider}
                                        value={healthcare_provider}
                                        onChange={(value: string) => handleOnChange('healthcare_provider', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-5">
                        <div className="row mb-3">
                            <label className="col-sm-12 col-md-5 col-lg-5 col-form-label col-form-label-sm bases__width52">
                                {trans.edit_profile.label_emergency_contact_name}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={contactNameValidatorRef}>
                                    <Input
                                        type="text"
                                        name="emergency_contact_name"
                                        placeholder={trans.edit_profile.placeholder_emergency_contact_name}
                                        value={emergency_contact_name}
                                        onChange={(value: string) => handleOnChange('emergency_contact_name', value)}
                                    />
                                </Validator>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-12 col-md-6 col-lg-6 col-form-label col-form-label-sm bases__width52">
                                {trans.edit_profile.label_emergency_contact_relationship}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={contactRelationshipValidatorRef}>
                                    <Input
                                        type="text"
                                        name="emergency_contact_relationship"
                                        placeholder={trans.edit_profile.placeholder_emergency_contact_relationship}
                                        value={emergency_contact_relationship}
                                        onChange={(value: string) => handleOnChange('emergency_contact_relationship', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-12 col-md-6 col-lg-6 col-form-label col-form-label-sm bases__width52">
                                {trans.edit_profile.label_emergency_contact_number}: <b className="color--text">(*)</b>
                            </label>
                            <div className="col">
                                <Validator ref={contactNumberValidatorRef}>
                                    <Input
                                        type="text"
                                        name="emergency_contact_number"
                                        placeholder={trans.edit_profile.placeholder_emergency_contact_number}
                                        value={emergency_contact_number}
                                        onChange={(value: string) => handleOnChange('emergency_contact_number', value)}
                                    />
                                </Validator>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-12 col-md-6 col-lg-6 col-form-label col-form-label-sm text-end bases__width52">
                                {trans.edit_profile.label_start_date}:
                            </label>
                            <div className="col">
                                <Input
                                    className="bases__background--smoke"
                                    type="text"
                                    value={dateHelper.formatDate(start_date_official, 'L')}
                                    readOnly={true}
                                    disabled={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default EditProfileForm;
