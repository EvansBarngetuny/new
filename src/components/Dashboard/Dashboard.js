const Dashboard = (props) => {
    return (
        <aside className="side-dashboard">

            <style jsx>{`
              .side-dashboard {
                background: white;
                width: 290px;
                height: 500px;
                border-right: 1px solid lightgray;
                border-left: 1px solid lightgray;
                border-bottom: 1px solid lightgray;
                position: fixed;
                top: 70px;
                margin-left: 0;
              }
            `}
            </style>
        </aside>
    );
}

export default Dashboard;