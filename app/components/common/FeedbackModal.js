import { useState } from 'react';
import patientApi from '../../api/patient/PatientApi'
import toasts from './Toast';

const FeedbackModal = ({ onClose, auth }) => {
    const [feedbackData, setFeedbackData] = useState({
        from: auth.email,
        subject: 'Khiếu nại',
        text: ''
    });

    const handleSendFeedback = async () => {
        try {
            const response = await patientApi.sendFeedback(feedbackData)

            if (response.errCode === 0) {
                toasts.successTopCenter(response.message)
                onClose();
            } else {
                toasts.errorTopCenter(response.message)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    console.log('chẹc data', feedbackData);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 w-full">
            <div className="bg-white p-6 rounded-lg w-600">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Gửi email góp ý</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Chọn chủ đề góp ý</label>
                    <select
                        value={feedbackData.subject}
                        onChange={(e) => setFeedbackData({...feedbackData, subject: e.target.value})}
                        className="border border-gray-300 rounded-md px-3 py-1 w-full focus:outline-none focus:ring focus:border-blue-500"
                    >
                        <option value="Khiếu nại">Khiếu nại</option>
                        <option value="Góp ý website">Góp ý website</option>
                        <option value="Thắc mắc">Thắc mắc</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Nội dung gửi (ngắn gọn, rõ ràng)</label>
                    <textarea
                        value={feedbackData.text}
                        onChange={(e) => setFeedbackData({...feedbackData, text: e.target.value})}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500"
                        rows="10"
                    ></textarea>
                </div>
                <div className="flex justify-end">
                    <button onClick={handleSendFeedback} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none">
                        Gửi
                    </button>
                    <button onClick={onClose} className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 focus:outline-none">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;
