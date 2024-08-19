import React from 'react';
import { useParams } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';

const TaskPage = () => {
    const { id } = useParams();
    return <TaskDetails taskId={id} />;
};

export default TaskPage;
