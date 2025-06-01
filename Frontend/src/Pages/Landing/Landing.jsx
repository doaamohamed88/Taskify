import BoardCard from '../../Components/BoardCard/BoardCard';
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
                            <strong>Transform Chaos into Clarity - Organize Tasks, </strong>Boost Productivity, and Achieve More with <span className={classes.logo}>Taskify</span></p>
                        <button>Create board</button>
                    </div>
                </div>
                <div className={classes.section}>
                    <div className={classes.cards_section}>
                        <p className={classes.boardName}>Created</p>
                        <div>
                            <div className={classes.card}>
                                <BoardCard boardType="created" />
                            </div>
                            <div className={classes.card}>
                                <BoardCard boardType="created" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.cards_section}>
                        <p className={classes.boardName}>Envolved</p>
                        <div>
                            <div className={classes.card}>
                                <BoardCard boardType="envolved" />
                            </div>
                            <div className={classes.card}>
                                <BoardCard boardType="envolved" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
