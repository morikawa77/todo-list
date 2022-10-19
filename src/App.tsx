import { Header } from './Components/Header';
import './global.css';
import styles from './App.module.css';
import { Tasks } from './Components/Tasks';

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <main>
          <Tasks />
        </main>
        
      </div>
    </div>
  )
}
