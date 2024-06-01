
VKRappW
├─ App
│  ├─ api
│  │  ├─ auth.js
│  │  ├─ eventApi.js
│  │  ├─ httpConfig.js
│  │  ├─ kanbanData.js
│  │  ├─ mail.js
│  │  ├─ privilege.js
│  │  ├─ structure.js
│  │  └─ user.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ public
│  │  ├─ fonts
│  │  │  ├─ PlusJakartaSans-Bold.ttf
│  │  │  └─ PlusJakartaSans-Medium.ttf
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.vue
│  │  ├─ assets
│  │  │  ├─ hyper.svg
│  │  │  ├─ icons
│  │  │  │  ├─ icon-add-task-mobile.svg
│  │  │  │  ├─ icon-check.svg
│  │  │  │  ├─ logo-dark.svg
│  │  │  │  ├─ logo-light.svg
│  │  │  │  └─ logo-mobile.svg
│  │  │  ├─ json
│  │  │  │  └─ data.json
│  │  │  ├─ logo.png
│  │  │  ├─ logo.svg
│  │  │  ├─ main.css
│  │  │  ├─ myStyle.js
│  │  │  └─ vue.svg
│  │  ├─ components
│  │  │  ├─ AuthForm.vue
│  │  │  ├─ Calendar
│  │  │  │  ├─ Calendar.vue
│  │  │  │  ├─ CalendarHeader.vue
│  │  │  │  ├─ DayCell.vue
│  │  │  │  ├─ Dropdown.vue
│  │  │  │  ├─ EventCard.vue
│  │  │  │  ├─ EventForm.vue
│  │  │  │  ├─ EventView.vue
│  │  │  │  ├─ icons
│  │  │  │  │  ├─ iconAdd.vue
│  │  │  │  │  ├─ iconArrowLeft.vue
│  │  │  │  │  ├─ iconArrowRight.vue
│  │  │  │  │  ├─ iconCloud.vue
│  │  │  │  │  └─ iconEvent.vue
│  │  │  │  └─ WeekDaysHeader.vue
│  │  │  ├─ form
│  │  │  │  └─ BaseSelect.vue
│  │  │  ├─ Header.vue
│  │  │  ├─ Kanban
│  │  │  │  ├─ bgOverlay.vue
│  │  │  │  ├─ board
│  │  │  │  │  ├─ AddNewColumn.vue
│  │  │  │  │  ├─ Board.vue
│  │  │  │  │  ├─ Empty.vue
│  │  │  │  │  ├─ NoBoards.vue
│  │  │  │  │  └─ Task.vue
│  │  │  │  ├─ buttons
│  │  │  │  │  ├─ AddTaskMobile.vue
│  │  │  │  │  ├─ Destructive.vue
│  │  │  │  │  ├─ PrimaryLarge.vue
│  │  │  │  │  ├─ PrimarySmall.vue
│  │  │  │  │  └─ SecondaryLarge.vue
│  │  │  │  ├─ form
│  │  │  │  │  ├─ BaseInput.vue
│  │  │  │  │  ├─ BaseSelect.vue
│  │  │  │  │  ├─ BaseTextarea.vue
│  │  │  │  │  └─ Delete.vue
│  │  │  │  ├─ icons
│  │  │  │  │  ├─ iconAdd.vue
│  │  │  │  │  ├─ IconArrowDown.vue
│  │  │  │  │  ├─ IconArrowUp.vue
│  │  │  │  │  ├─ IconBoard.vue
│  │  │  │  │  ├─ IconCross.vue
│  │  │  │  │  ├─ IconDarkTheme.vue
│  │  │  │  │  ├─ IconHideSidebar.vue
│  │  │  │  │  ├─ IconIncomeMail.vue
│  │  │  │  │  ├─ IconLightTheme.vue
│  │  │  │  │  ├─ iconSent.vue
│  │  │  │  │  ├─ IconShowSidebar.vue
│  │  │  │  │  ├─ iconTrash.vue
│  │  │  │  │  └─ IconVerticalEllipsis.vue
│  │  │  │  ├─ Kanban.vue
│  │  │  │  └─ manager
│  │  │  │     ├─ BoardForm.vue
│  │  │  │     ├─ Dropdown.vue
│  │  │  │     ├─ sidebar
│  │  │  │     │  ├─ DarkModeSwitch.vue
│  │  │  │     │  ├─ HideSidebar.vue
│  │  │  │     │  └─ ShowSidebar.vue
│  │  │  │     ├─ SidebarMobile.vue
│  │  │  │     ├─ TaskForm.vue
│  │  │  │     ├─ taskView
│  │  │  │     │  └─ Subtask.vue
│  │  │  │     └─ TaskView.vue
│  │  │  ├─ Mail
│  │  │  │  ├─ Mail.vue
│  │  │  │  ├─ MailCard.vue
│  │  │  │  ├─ MailList.vue
│  │  │  │  ├─ manager
│  │  │  │  │  ├─ Dropdown.vue
│  │  │  │  │  ├─ MailForm.vue
│  │  │  │  │  └─ MailView.vue
│  │  │  │  └─ NoMails.vue
│  │  │  ├─ Sidebar.vue
│  │  │  └─ User
│  │  │     └─ RegistrationForm.vue
│  │  ├─ main.js
│  │  ├─ router
│  │  │  └─ index.js
│  │  ├─ stores
│  │  │  ├─ AuthStore.js
│  │  │  ├─ boards.js
│  │  │  ├─ events.js
│  │  │  ├─ mails.js
│  │  │  └─ manager.js
│  │  ├─ style.css
│  │  └─ utils
│  │     ├─ ErrorHandler.js
│  │     ├─ handleKeydown.js
│  │     └─ init.js
│  ├─ tailwind.config.js
│  └─ vite.config.js
└─ Server
   ├─ .env
   ├─ controllers
   │  ├─ authController.js
   │  ├─ boardController.js
   │  ├─ eventController.js
   │  ├─ mailController.js
   │  ├─ privilegeController.js
   │  ├─ structureController.js
   │  └─ userController.js
   ├─ helpers
   │  └─ db
   │     └─ mongodb.js
   ├─ index.js
   ├─ middleware
   │  ├─ authMiddleware.js
   │  ├─ extractSocketId.js
   │  └─ updatesSubscribe.js
   ├─ models
   │  ├─ Event.js
   │  ├─ InitDB.js
   │  ├─ Mail.js
   │  ├─ Privilege.js
   │  ├─ Structure.js
   │  ├─ Task
   │  │  └─ Board.js
   │  └─ User.js
   ├─ package-lock.json
   ├─ package.json
   ├─ routes
   │  ├─ authRoutes.js
   │  ├─ boardRoutes.js
   │  ├─ eventRoutes.js
   │  ├─ mailRoutes.js
   │  ├─ privilegeRoutes.js
   │  ├─ structureRoutes.js
   │  └─ userRoutes.js
   ├─ Server.js
   ├─ services
   │  ├─ AuthService.js
   │  ├─ boardService.js
   │  ├─ departmentService.js
   │  ├─ eventService.js
   │  ├─ mailService.js
   │  ├─ postService.js
   │  ├─ privilegeService.js
   │  └─ userService.js
   └─ socketServer.js
