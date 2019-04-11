/* eslint-disable no-undef */
/* eslint-disable no-console */
interface Subject {
  registerObserver(observer: Observer): void
  removeObserver(observer: Observer): void
  notifyObservers(): void
}

interface Observer {
  update(temp: number): void
}

class WeatherStation implements Subject {
  private temperature: number = 0
  private observers: Observer[] = []

  public setTemperature(temp: number): void {
    console.log(`WeatherStation: new temperature measurement: ${temp}˚C`)
    this.temperature = temp
    this.notifyObservers()
  }

  public registerObserver(observer: Observer): void {
    this.observers.push(observer)
  }

  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    this.observers.splice(index, 1)
  }

  public notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature)
    }
  }
}

class TemperatureDisplay implements Observer {
  private subject: Subject

  public constructor(weatherStation: Subject) {
    this.subject = weatherStation
    weatherStation.registerObserver(this)
  }
  public update(temp: number): void {
    console.log(`TemperatureDisplay: I need to update my display to ${temp}˚C`)
    // TODO: some real logic here!
  }
}

class Fan implements Observer {
  private subject: Subject

  public constructor(weatherStation: Subject) {
    this.subject = weatherStation
    weatherStation.registerObserver(this)
  }
  public update(temp: number): void {
    if (temp > 25) {
      console.log("Fan: It's hot here, turning myself on..")
      // TODO: some real logic here!
    } else {
      console.log("Fan: It's nice and cool here, turning myself off..")
      // TODO: some real logic here!
    }
  }
}

const weatherStation = new WeatherStation()

new TemperatureDisplay(weatherStation)

new Fan(weatherStation)

/**
 * WeatherStation: new temperature measurement: 20˚C
 * TemperatureDisplay: I need to update my display to 20˚C
 * Fan: It's nice and cool here, turning myself off..
 */
weatherStation.setTemperature(20)

/**
 * WeatherStation: new temperature measurement: 30˚C
 * TemperatureDisplay: I need to update my display to 30˚C
 * Fan: It's hot here, turning myself on..
 */
weatherStation.setTemperature(30)
