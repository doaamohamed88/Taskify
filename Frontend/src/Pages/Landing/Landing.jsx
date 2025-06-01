import Card from '../../components/Card/Card';
import classes from './Landing.module.css';

export default function LandingPage() {


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
                                <Card ></Card>
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
