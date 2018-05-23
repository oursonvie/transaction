between = (x, min, max) => {
  return x > min && x <= max
}

stepRatio = (amount) => {
  if ( between(amount, 0, 300000) ) {
    return 0.35
  } else if ( between(amount, 300000, 600000) ) {
    return 0.4
  } else if ( between(amount, 600000, 1000000) ) {
    return 0.45
  } else if ( between(amount, 1000000, 3000000) ) {
    return 0.5
  } else if ( between(amount, 3000000, 6000000) ) {
    return 0.55
  } else if ( amount > 6000000 ) {
    return 0.6
  } else {
    return 0
  }
}

getRatio = (amount, lowestRatio) => {
  let ratio = stepRatio(amount)
  if (ratio >= lowestRatio) {
    return ratio
  } else {
    return lowestRatio
  }
}
