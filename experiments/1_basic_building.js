/**
 * Basic Building
 *
 * TODO
 * [X] General shape
 * [X] Put a roof on it (drawRoof)
 * [ ] Make it not look ugly
 * [ ] Exterior details
 * [ ] Better code (allows for dynamic cube and floor size)
 *     - Would be nice to find a way to declare the overall shape instead of using translate()
 * [ ] Worth the time?
 */

export default function sketch(sk) {
    const UNIT = 50

    // Create a hollow square of boxes to be the "floors" of the building
    const drawFloor = ({ isFirstFloor = false } = {}) => {
        sk.translate(0, UNIT, 0);

        [...Array(16)].map((_, i) => {
            const ratio = i / 16;

            // TODO: Refactor this mess to use math based on a dynamic floor size
            // Warning: This is some bogus logic built to work with the idea of a wall built in a square shape with 16 cubes
            if (ratio >= 0.75) {
                if (isFirstFloor && ratio >= 0.8 && ratio <= 0.85) {
                    // create a "door" by changing the fill for this box
                    sk.fill(60, 60, 60)
                }
                sk.translate(0, 0, (0 - UNIT));
            } else if (ratio >= 0.50) {
                sk.translate((0 - UNIT), 0, 0);
            } else if (ratio >= 0.25) {
                sk.translate(0, 0, UNIT);
            } else {
                sk.translate(UNIT, 0, 0);
            }

            sk.box(UNIT);
            sk.fill(10, 200, 400)
        });
    }

    // Create a solid square of boxes to be the "roof" of the building
    const drawRoof = () => {
        sk.fill(250, 250, 250);

        [...Array(26)].map((_, i) => {
            sk.fill(250, 250, 250);

            // TODO: Refactor this mess to use math based on a dynamic floor size
            // Warning: This is some bogus logic built to work with a floor built with 26 cubes
            if (i >= 21 || (i < 16 && i >= 11) || (i < 6 && i >= 0)) {
                if (i === 21 || i === 11 || i === 1) {
                    sk.translate((0 - UNIT), 0, 0);
                } else {
                    sk.translate(0, 0, (0 - UNIT));
                }
            } else {
                if (i === 16 || i === 6) {
                    sk.translate((0 - UNIT), 0, 0);
                } else {
                    sk.translate(0, 0, UNIT);
                }
            }

            if (i !== 0) {
                sk.box(UNIT);
            }
        });

        sk.fill(10, 200, 400)
    }

    const drawBuilding = ({ numberOfFloors = 1 }) => {
        drawRoof();
        [...Array(numberOfFloors)].map((_, i) => {
            drawFloor({ isFirstFloor: i === numberOfFloors - 1 })
        });
    }

    sk.setup = function () {
        sk.createCanvas(sk.windowWidth, sk.windowHeight, sk.WEBGL);
    }

    sk.draw = function () {
        sk.background(300, 300, 300);
        sk.fill(10, 200, 400)
        sk.strokeWeight(2);
        sk.smooth()

        // Set up positioning so building is in middle of screen
        sk.translate(0, -200, 0)

        // Give it a nice initial position
        sk.rotateX(-0.15)
        sk.rotateY(.8);

        // Slowly rotate the thing
        sk.rotateY(sk.frameCount * 0.001);

        drawBuilding({ numberOfFloors: 6 })
    }
}
