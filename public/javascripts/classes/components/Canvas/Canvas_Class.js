import {CanvasScale} from '../CanvasScale/CanvasScale_Class.js'
import {CanvasPan} from '../CanvasPan/CanvasPan_Class.js'

function Canvas(canvasElement, aCanvas_scale_element, aCanvas_pan_element) {
    this.canvasElement = canvasElement
    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }
    this.scaleObject = {}
    this.panObject = {}
    this.scaleElement = aCanvas_scale_element
    this.panElement = aCanvas_pan_element
    this.canvScaleClass = new CanvasScale(this.scaleElement)
    this.canvasPanClass = new CanvasPan(this.panElement, this.canvScaleClass.scaleObject)
    this.canvasDocuments = []
}

// function Canvas(canvasData) {
//     this.canvasElement = canvasData.A_CANVAS.elements.elementData.element
//     this.vars = {
//         stringIncrement: -1,
//         previousDrawPathObj: undefined
//     }
//     this.scaleObject = {}
//     this.panObject = {}
//     this.scaleElement = canvasData.A_CANVAS.elements.contentElementsData[0].element
//     this.panElement = canvasData.A_CANVAS.elements.contentElementsData[1].element
//     this.canvScaleClass = new CanvasScale(this.scaleElement)
//     this.canvasPanClass = new CanvasPan(this.panElement, this.canvScaleClass.scaleObject)
//     this.canvasDocuments = []
// }

export {
    Canvas
}

console.log("*not* ORIGIN BRANCH")
console.log("PROJECT-ORGANIZATION BRANCH")
console.log("'git checkout main' to get back to main branch")


// Starting a new branch on GitHub involves both creating the branch locally on your computer and then pushing it to the remote GitHub repository. Here's a step-by-step guide:

// 1. Open Your Terminal or Command Line
// Navigate to your project directory using the terminal.

// bash
// Copy code
// cd /path/to/your/repo
// 2. Ensure You’re on the Correct Base Branch
// Before creating a new branch, make sure you’re on the branch you want to branch off from (typically main or master).

// bash
// Copy code
// git checkout main
// or

// bash
// Copy code
// git checkout master
// 3. Pull the Latest Changes
// Make sure your branch is up to date with the latest changes from the remote repository.

// bash
// Copy code
// git pull origin main
// or

// bash
// Copy code
// git pull origin master
// 4. Create a New Branch
// Now, create a new branch using the git branch command followed by git checkout or using the shorthand git checkout -b:

// bash
// Copy code
// git checkout -b new-branch-name
// Replace new-branch-name with your desired branch name.

// 5. Push the New Branch to GitHub
// Once the branch is created, push it to the remote repository on GitHub:

// bash
// Copy code
// git push -u origin new-branch-name
// The -u flag sets the upstream branch, so in future, you can just use git push without specifying the branch.

// 6. Verify the New Branch on GitHub
// You can verify that the branch was successfully created by visiting your repository on GitHub. The new branch should appear in the branch list.

// 7. Start Working on Your Branch
// Now that the branch is created and pushed, you can start making changes to your code, commit them, and push them to your branch:

// bash
// Copy code
// git add .
// git commit -m "Your commit message"
// git push
// This will push the changes to your new branch on GitHub.





// You said:
// how do i go back to other branch
// ChatGPT said:
// ChatGPT
// To switch back to another branch in your Git repository, you can use the git checkout or git switch command. Here’s how to do it:

// 1. List All Branches (Optional)
// First, if you’re not sure which branches are available, you can list them:

// bash
// Copy code
// git branch
// This command will show you a list of all branches in your local repository. The current branch you’re on will be marked with an asterisk (*).

// 2. Switch to the Other Branch
// To switch to another branch, use one of the following commands:

// Using git checkout:

// bash
// Copy code
// git checkout branch-name
// Or using git switch (available in newer versions of Git):

// bash
// Copy code
// git switch branch-name
// Replace branch-name with the name of the branch you want to switch to.

// 3. Update the Branch (Optional but Recommended)
// If you’re switching to a branch that tracks a remote branch (e.g., main or master), it’s a good idea to pull the latest changes:

// bash
// Copy code
// git pull origin branch-name
// This ensures that your branch is up to date with the latest changes from the remote repository.

// Example:
// If you were on a feature branch called new-feature and wanted to switch back to the main branch:

// bash
// Copy code
// git checkout main
// or

// bash
// Copy code
// git switch main
// Then, to pull the latest changes:

// bash
// Copy code
// git pull origin main
// Now you’re back on the main branch, and you can continue working or switch to another branch as needed.