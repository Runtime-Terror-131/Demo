                                                                           Runtime Terror 

This is a readme file for the Vendia group project for the CSC131 class at California State University, Sacramento. This file is designed to give an overview of our software, its contributors and description, and instructions on how it works. 

Contributors: 

1. Zhen Zhao 
2. Mohammad Imrose 
3. Hamzah Aldolaay 
4. Ekjyot Singh Shinh 
5. Connor Yep 
6. Surmeet Singh 
7. Pratyush Mehra 

Program Description: 
This program aims to develop a distributed information system to develop a safe and effective drug that enables auditable exchange of study data between three different firms. These three different firms are the Federal Drug Administration, a pharmaceutical company called Bavaria, and a group of researchers at an institute called Jane Hopkins. This program is equipped with user-friendly and distinctive interfaces for the FDA, Bavaria, and researchers at Jane Hopkins. To achieve this goal, we will leverage the Vendia Share platform to build the system, which ensures immutable, cryptographically verified, and distributed data exchange while providing the necessary data flow control mechanisms for the whole program. 

Visual Representation of the program:

Welcome to our web app! 
- Click the 'login' button if you already have an account with us.
- Click the 'sign up' button if you're new here and need to create an account.
- Click 'forgot password' if you need help resetting your password.

                        LOGO             

                        Email     

                       Password   

                     Login|Sign up 

                    Forgot Password 

Now that you're logged in, let's take a look at the different views available depending on whether you're from FDA, Pharma, or Doctor:

For example, let's view the 'Doctor' view:

                    GENERAL TAB HEADER       

                   Create a New Patient   
         
                   View Patient Records        

That's it! Please select the appropriate view for you and enjoy the web app.
Note: There are three different views based on the type of user logged in.  

Required Technology: 
This program uses React for front-end, whereas Vendia Client SDK for back-end development. We have also used Firebase to authenticate any type of user who tries to log into the program. Also, it is important to know that to run this program locally on your machine for testing purposes, you will need to install node from node.js(https://nodejs.org/en/). 

Usage: 
The primary usability of this program is that Bavaria, Jane Hopkins Hospital, and the FDA are collaborating on a phase 3 medical trial for a new antiviral medication involving approximately 100 patients. This trial requires a smart contract to verify patient eligibility criteria, allowing Jane Hopkins to share anonymized patient records with Bavaria and the FDA. Each entity has their different respective roles, for example, the FDA assigns patients to the treatment and control groups, Jane Hopkins tracks treatment and viral loads. Moreover, the FDA shares the group assignment with Bavaria and Jane Hopkins, and complete anonymized patient records are shared for further investigation.
