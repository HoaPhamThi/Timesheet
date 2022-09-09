import { useTrans } from '@utils/hooks';

const DetailNotice: INoticeComponent<INoticeComponentProps> = (props) => {
    const { message, attachment, subject } = props;
    const trans = useTrans();
    return (
        <div className="components__detail-notice">
            <h5 className="bases__text--bold ">{subject}</h5>
            <div className="bases__padding15">
                <p>{message}</p>

                <span className="bases__text--bold ">
                    {trans.form_detail_notice.attachment}
                    <span>
                        &nbsp;
                        <a
                            className="bases__text--italic bases__text--blue bases__text--semi-bold bases__p--cursor "
                            onClick={() => window.open(attachment)}
                        >
                            {attachment}
                        </a>
                    </span>
                </span>
            </div>
        </div>
    );
};

export default DetailNotice;
