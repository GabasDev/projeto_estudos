import styles from './Header.module.css';

import igniteLogo from '../assets/ignitelogo.svg'

export function Header() {
    return (
        <header className={styles.Header}>
            <img src={igniteLogo} alt= "Logotipo do ignite" />
        </header>
    );
}
