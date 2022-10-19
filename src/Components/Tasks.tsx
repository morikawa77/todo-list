import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { PlusCircle, Trash, Check } from 'phosphor-react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { v4 as uuidv4 } from 'uuid';
import styles from './Tasks.module.css';
import tasksIcon from '../assets/tasks.svg';

interface TaskProps {
  id: string
  content: string;
  hasDone: boolean;
}


export function Tasks() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const [newTaskContent, setNewTaskContent] = useState('');

  const isNewTaskEmpty = newTaskContent.length === 0;

  const [tasksConcludedCount, setTasksConcludedCount] = useState(0);

  

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, {
      id: uuidv4(),
      content: newTaskContent,
      hasDone: false,
    }]);

    setNewTaskContent('');
  }

  function handleNewTaskContentChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTaskContent(event.target.value);
  }

  function handleNewTaskContentInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Este campo é obrigatório!");
  }

  function handleToogleConcludeTask(id: string){
    const newTasksArray = [...tasks].map(task => {
      if (task.id === id) {
        task.hasDone = !task.hasDone

        if(task.hasDone){
          setTasksConcludedCount(tasksConcludedCount + 1);
        } else {
          setTasksConcludedCount(tasksConcludedCount - 1);
        }

      }

      return task;
    });
      

    console.log(setTasksConcludedCount);

    setTasks(newTasksArray);
  }

  function handleDeleteTask(id: string) {
    tasks.map(task => {
      if (task.id === id) {
        if (task.hasDone){
          setTasksConcludedCount(tasksConcludedCount - 1)
        }
      }
    });

    const tasksWithoutDeletedOne = [...tasks].filter(task => task.id !== id);
    setTasks(tasksWithoutDeletedOne);    
  
  }

  return(
    <>
      <form className={styles.formBox} onSubmit={handleCreateTask}>
        <input 
          name='newTaskContent'
          className={styles.taskText} 
          type='text' 
          placeholder='Adicione uma tarefa'
          value={newTaskContent}
          onChange={handleNewTaskContentChange}
          onInvalid={handleNewTaskContentInvalid}
          required
          maxLength={154}
        />
        <button 
          type='submit' 
          disabled={isNewTaskEmpty} 
          className={styles.button}
        >
          Criar
          <PlusCircle size={16} weight="bold" className={styles.icon}/>
        </button>
      </form>

      <div className={styles.tasks}>
        <header className={styles.header}>
          <p>
            Tarefas criadas
            <span>
              {tasks.length}
            </span>
          </p>
          <p>
            Concluídas
            <span>
              { tasksConcludedCount === 0 
                ? 0 
                : tasksConcludedCount + ' de ' + tasks.length
              }
            </span>
          </p>
        </header>
        <main className={styles.main}>
          { tasks.length > 0
            ?  
            tasks.map(task => {
              return (
                <div key={task.id} className={styles.singleTask}>
                  <CheckboxPrimitive.Root 
                    className={styles.checkboxStyled}
                    checked={task.hasDone}
                    onClick={() => handleToogleConcludeTask(task.id)}
                    id={task.id}
                  >
                    <CheckboxPrimitive.Indicator>
                      <Check size={12} className={styles.checkIcon} />
                    </CheckboxPrimitive.Indicator>
                  </CheckboxPrimitive.Root>
                  <label htmlFor={task.id}>
                    {task.content}
                  </label>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <Trash size={24} weight="bold" />
                  </button>
                </div>
              )
            })
            : 
              <div className={styles.noTasks}>
                <img src={tasksIcon} alt="Tasks" />
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            }
        </main>
      </div>
    </>
  );
}