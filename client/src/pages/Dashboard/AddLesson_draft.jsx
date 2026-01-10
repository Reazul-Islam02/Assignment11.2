import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';

const AddLesson = () => {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const lessonData = {
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            emotionalTone: form.emotionalTone.value,
            imageURL: form.imageURL.value,
            visibility: form.visibility.value,
            accessLevel: form.accessLevel.value,
            creatorId: user.uid, // Ideally backend handles this via token, but schema requires objectId ref... 
            // Wait, schema requires ObjectId linking to User collection. 
            // The backend 'verifyToken' sets req.user. The backend route 'lessons.js' doesn't set creatorId automatically from req.user by default unless we updated it. 
            // Let's assume backend needs us to pass it or we should fix backend. 
            // Current backend lessons.js: const result = await Lesson.create(lessonData);
            // It trusts frontend for everything. I should find user's MongoDB _id first?
            // Actually, for this scaffolding, I might need to fetch user's _id or just pass the email/uid and let backend resolve?
            // "creatorId": { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
            // If I send a string it might fail if it's not a valid ObjectId.
            // But verifyToken middleware usually finds the user. 
            // Let's rely on my previous knowledge that the user usually has _id in userData.
            // const { userData } = useContext(AuthContext); // Check if AuthProvider gives userData (db user object)
            creatorName: user.displayName,
            creatorPhoto: user.photoURL,
            creatorEmail: user.email // Just in case
        };
        // We need the Mongo _id from the implementation plan. 
        // I will trust that AuthProvider provides `userData` which has `_id`.
    };

    // Re-writing the submit to be cleaner in next step
    return (
        <div></div>
    );
};
export default AddLesson;
