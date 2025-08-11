import { colors } from "@/constants/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const Stepper = ({ currentStep }: { currentStep: number }) => {
  const totalSteps = 4;

  return (
    <View style={styles.container}>
      {/* Background line */}
      <View style={styles.line} />

      {/* Circles */}
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        let circleStyle = styles.notStarted;

        if (stepNumber < currentStep) {
          circleStyle = styles.done;
        } else if (stepNumber === currentStep) {
          circleStyle = styles.inProgress;
        }

        return (
          <View key={index} style={[styles.circleWrapper]}>
            <View style={[styles.circle, circleStyle]}>
              {stepNumber === currentStep && (
                <View style={styles.innerCircle} />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    position: "relative",
  },
  line: {
    position: "absolute",
    top: "45%",
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: "#666", // dark gray line
    zIndex: -1,
    borderRadius: 4,
  },
  circleWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: colors.white,
    borderCurve: "circular",
  },
  done: {
    backgroundColor: "limegreen",
  },
  inProgress: {
    backgroundColor: "gold",
  },
  notStarted: {
    backgroundColor: "#ccc",
  },
  innerCircle: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 15,
  },
});

export default Stepper;
