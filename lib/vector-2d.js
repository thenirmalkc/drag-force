const UNIT_RADIAN_IN_DEGREE = 57.2958;
const UNIT_DEGREE_IN_RADIAN = 0.0174533;

class Vector2D {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	copy() {
		return new Vector2D(this.x, this.y);
	}

	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}

	set_x(x) {
		this.x = x;
		return this;
	}

	set_y(y) {
		this.y = y;
		return this;
	}

	add(vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	}

	sub(vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	}

	mult(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	div(scalar) {
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	mag() {
		return calculate_magnitude(this);
	}

	dot(vector) {
		return this.x * vector.x + this.y * vector.y;
	}

	angle(vector) {
		return Math.acos(this.dot(vector) / (this.mag() * calculate_magnitude(vector)));
	}

	angle_in_degree(vector) {
		return UNIT_RADIAN_IN_DEGREE * this.angle(vector);
	}

	normalize() {
		this.div(this.mag());
		return this;
	}

	set_mag(scalar) {
		this.normalize();
		this.mult(scalar);
		return this;
	}

	limit(scalar) {
		if(this.mag() > scalar) {
			this.set_mag(scalar);
		}
		return this;
	}

	rotate(radian) {
		const { x, y } = this;
		const mag = this.mag();
		this.x = x * Math.cos(radian) - y * Math.sin(radian);
		this.y = x * Math.sin(radian) + y * Math.cos(radian);
		this.set_mag(mag);
		return this;
	}

	rotate_in_degree(degree) {
		this.rotate(UNIT_DEGREE_IN_RADIAN * degree);
		return this;
	}
}

function calculate_magnitude(vector) {
	return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}