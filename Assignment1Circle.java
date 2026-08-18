package com.assignment1;

public class Circle {

    private int radius;
    private String colour;

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public float calcArea() {
        return 3.14f * radius * radius;
    }

    public static void main(String[] args) {

        Circle c = new Circle();

        c.setRadius(7);
        c.setColour("Red");

        System.out.println("Radius : " + c.getRadius());
        System.out.println("Colour : " + c.getColour());
        System.out.println("Area   : " + c.calcArea());
    }
}
