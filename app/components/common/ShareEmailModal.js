import { useState } from 'react';

const ShareEmailModal = ({ isOpen, onClose, onShare }) => {
    const [emails, setEmails] = useState(['']);

    const addEmailField = () => {
        setEmails([...emails, '']);
    };

    const removeEmailField = (index) => {
        setEmails(emails.filter((_, i) => i !== index));
    };

    const handleEmailChange = (index, value) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    const handleShare = () => {
        onShare(emails);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4">Enter Emails to Share Code</h2>
                {emails.map((email, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            className="border p-2 flex-1 rounded"
                            placeholder="Enter email"
                        />
                        {emails.length > 1 && (
                            <button
                                className="ml-2 text-red-500 font-bold border-red-500 border-1 p-1 w-fit h-fit rounded-lg"
                                onClick={() => removeEmailField(index)}
                            >
                                x
                            </button>
                        )}
                    </div>
                ))}
                <button className="bg-blue-500 text-white p-2 rounded w-full mb-2" onClick={addEmailField}>
                    Add Another Email
                </button>
                <button className="bg-green-500 text-white p-2 rounded w-full" onClick={handleShare}>
                    Share
                </button>
                <button className="mt-4 text-gray-500 underline w-full" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ShareEmailModal
