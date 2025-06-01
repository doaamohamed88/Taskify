import { useEffect, useState } from 'react';
import Card from '../../Components/Card/Card';
import classes from './Landing.module.css';

export default function LandingPage() {
    // const fullText = "Welcome to your personal task space.";
    // const [text, setText] = useState('');

    // useEffect(() => {
    //     let index = 0;

    //     const interval = setInterval(() => {
    //         setText(prev => {
    //             const nextText = fullText.slice(0, index + 1);
    //             index++;

    //             if (index >= fullText.length) {
    //                 clearInterval(interval);
    //             }

    //             return nextText;
    //         });
    //     }, 80);

    //     return () => clearInterval(interval);
    // }, [fullText]);

    return (
        <div className={classes.landing_page}>
            <div className={classes.background_mesh}></div>
            <div className={classes.geometric_grid}></div>

            <div className={classes.landing_content}>
                <div className={classes.section}>
                    <div>
                        <p className={classes.typingText}>
                            <strong>Transform Chaos into Clarity – Organize Tasks, </strong>Boost Productivity, and Achieve More with <strong>Task Manager</strong></p>
                        <button>Create board</button>
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={classes.cards_section}>
                        <p>Created</p>
                        <div>
                            <div className={classes.card}>
                                <Card />
                            </div>
                            <div className={classes.card}>
                                <Card />
                            </div>
                        </div>
                    </div>
                    <div className={classes.cards_section}>
                        <p>Involved</p>
                        <div>
                            <div className={classes.card}>
                                <Card />
                            </div>
                            <div className={classes.card}>
                                <Card />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
