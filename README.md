# Mandelbrot Set Viewer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).

![The Mandelbrot Set]("/public/mandelbrot.png")

## Math Explained

The Mandelbrot Set contains complex numbers which have `sqrt(-1)` as a component. This "imaginary" component is represented by `i`. This Mandelbrot Set visualization represents these complex numbers in the XY-plane.

### Set Definition
For an imaginary number `c` and a corresponding set of imaginary numbers `z(n)` where `z(0) = 0` and `z(n+1) = z(n)^2, + c`, `c` is considered to be part of the Mandelbrot Set if `|z| <= 2` for `n ∈ [0, inf)`.

### Representing Complex Numbers in 2D
The complex numbers `c` and `z(n)` have real and imaginary components and can be represented as a sum of these two components `x + yi`. These two components are independent and their magnitudes can be mapped to points in 2D space `[x,y]`.

### Squaring a Complex Number
This can be understood using the two part representation `x + yi`:
```
z(n)^2
(x + yi)^2
(x + yi) * (x + yi)
x^2 + 2xyi + (y^2 * i^2)
x^2 + 2xyi + (y^2 * sqrt(-1)^2)
x^2 + 2xyi + (y^2 * -1)
x^2 + 2xyi + (-y^2)
x^2 - y^2 + 2xyi
(x^2 - y^2) + (2xy)i
```

### Calculating `z(n+1)` from `z(n)` and `c`
After applying the squaring process above to `z(n)` just add the magnitude of each component of `c` to the corresponding component of the squared number. The reasoning is:
```
z(n)^2 + c
(xz + yzi)^2 + (xc + yci)
(xz + yzi) * (xz + yzi) + (xc + yci)
xz^2 - yz^2 + 2xzyzi + (xc + yci)
xz^2 - yz^2 + xc + 2xzyzi + yci
(xz^2 - yz^2 + xc) + (2xzyz + yc)i
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
