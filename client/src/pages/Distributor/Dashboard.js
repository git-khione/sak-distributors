import React from 'react';
import style from './Dashboard.module.scss';

//Material UI Components
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

//Shared Components
import Page from '../../shared/Page/Page';

//images
import user from '../../images/user.svg';

export default function Dashboard() {

    const [value, setValue] = React.useState(new Date());

    const firsttimelogin = JSON.parse(sessionStorage.getItem("Auth")).firsttimelogin;
    const employeeimage = JSON.parse(sessionStorage.getItem("Auth")).employeeimage;
    const designation = JSON.parse(sessionStorage.getItem("Auth")).designation;
    const firstname = JSON.parse(sessionStorage.getItem("Auth")).firstname;
    const lastname = JSON.parse(sessionStorage.getItem("Auth")).lastname;
    const email = JSON.parse(sessionStorage.getItem("Auth")).email;
    const employeeid = JSON.parse(sessionStorage.getItem("Auth")).employeeid;
    const employeestatus = JSON.parse(sessionStorage.getItem("Auth")).employeestatus;

    if (firsttimelogin) {
        window.location.replace("http://localhost:3000/change-password");
    }

    return (
        <Page title="Dashboard">
            <div className={style.mediumScreen}>

                <div className={style.scrollable}>

                    <div className={style.userInfo}>
                        <div className={style.imageRow}>
                            <img src={employeeimage ? `http://${employeeimage}` : user} alt="" />
                        </div>
                        <div className={style.infoRow}>
                            <div className={style.textDiv}>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Emp. ID:
                                    </div>
                                    <div className={style.regulartext}>
                                        {employeeid}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Name:
                                    </div>
                                    <div className={style.regulartext}>
                                        {firstname} {lastname}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Email:
                                    </div>
                                    <div className={style.regulartext}>
                                        {email}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Role:
                                    </div>
                                    <div className={style.regulartext}>
                                        {designation}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Status:
                                    </div>
                                    <div className={style.regulartext}>
                                        {employeestatus}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className={style.notifications}>

                    </div>

                    <div className={style.recentActivities}>

                    </div>

                    <div className={style.personalNotes}>

                    </div>

                </div>

                <div className={style.sticky}>

                    <div className={style.calendar}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                orientation="portrait"
                                openTo="day"
                                value={value}
                                shouldDisableDate={isWeekend}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className={style.onlineUsers}>

                    </div>

                </div>

            </div>

            <div className={style.largeScreen}>

                <div className={style.scrollable}>

                    <div className={style.userInfo}>
                        <div className={style.imgCol}>
                            <img src={employeeimage ? `http://${employeeimage}` : user} alt="" />
                        </div>
                        <div className={style.infoCol}>
                            <div className={style.textDiv}>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Emp. ID:
                                    </div>
                                    <div className={style.regulartext}>
                                        {employeeid}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Name:
                                    </div>
                                    <div className={style.regulartext}>
                                        {firstname} {lastname}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Email:
                                    </div>
                                    <div className={style.regulartext}>
                                        {email}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Role:
                                    </div>
                                    <div className={style.regulartext}>
                                        {designation}
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div className={style.boldtext}>
                                        Status:
                                    </div>
                                    <div className={style.regulartext}>
                                        {employeestatus}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={style.notifications}>

                    </div>

                    <div className={style.recentActivities}>

                    </div>

                    <div className={style.personalNotes}>

                    </div>

                </div>

                <div className={style.sticky}>

                    <div className={style.calendar}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                orientation="portrait"
                                openTo="day"
                                value={value}
                                shouldDisableDate={isWeekend}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className={style.onlineUsers}>

                    </div>

                </div>

            </div>

            <div className={style.extraLargeScreen}>

                <div className={style.scrollable}>

                    <div className={style.columnA}>

                        <div className={style.userInfo}>
                            <div className={style.imageRow}>
                                <img src={employeeimage ? `http://${employeeimage}` : user} alt="" />
                            </div>
                            <div className={style.infoRow}>
                                <div className={style.textDiv}>
                                    <div className={style.text}>
                                        <div className={style.boldtext}>
                                            Emp. ID:
                                        </div>
                                        <div className={style.regulartext}>
                                            {employeeid}
                                        </div>
                                    </div>
                                    <div className={style.text}>
                                        <div className={style.boldtext}>
                                            Name:
                                        </div>
                                        <div className={style.regulartext}>
                                            {firstname} {lastname}
                                        </div>
                                    </div>
                                    <div className={style.text}>
                                        <div className={style.boldtext}>
                                            Email:
                                        </div>
                                        <div className={style.regulartext}>
                                            {email}
                                        </div>
                                    </div>
                                    <div className={style.text}>
                                        <div className={style.boldtext}>
                                            Role:
                                        </div>
                                        <div className={style.regulartext}>
                                            {designation}
                                        </div>
                                    </div>
                                    <div className={style.text}>
                                        <div className={style.boldtext}>
                                            Status:
                                        </div>
                                        <div className={style.regulartext}>
                                            {employeestatus}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={style.personalNotes}>

                        </div>

                    </div>

                    <div className={style.columnB}>

                        <div className={style.notifications}>

                        </div>

                        <div className={style.recentActivities}>

                        </div>

                    </div>

                </div>

                <div className={style.sticky}>

                    <div className={style.calendar}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                                orientation="landscape"
                                openTo="day"
                                value={value}
                                shouldDisableDate={isWeekend}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className={style.onlineUsers}>

                    </div>

                </div>

            </div>


        </Page>
    )
};
