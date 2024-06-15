/*
 Web client

 This sketch connects to a website (http://www.google.com)
 using an Arduino WIZnet Ethernet shield.

 Circuit:
 * Ethernet shield attached to pins 10, 11, 12, 13

 created 18 Dec 2009
 by David A. Mellis
 modified 9 Apr 2012
 by Tom Igoe, based on work by Adrian McEwen

 */

#define relay 3  // реле D3
#define soil A0 //датчик A0
#include <SPI.h>
#include <Ethernet.h>
#include <Adafruit_AHTX0.h>
#include <ArduinoJson.h>
Adafruit_AHTX0 aht;

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };

// if you don't want to use DNS (and reduce your sketch size)
// use the numeric IP instead of the name for the server:
IPAddress server(192,168,31,170);  // numeric IP for Google (no DNS)
// server[] = "www.google.com";    // name address for Google (using DNS)

// Set the static IP address to use if the DHCP fails to assign
IPAddress ip(192, 168, 0, 177);
IPAddress myDns(192, 168, 0, 1);

// Initialize the Ethernet client library
// with the IP address and port of the server
// that you want to connect to (port 80 is default for HTTP):
EthernetClient client;

// Variables to measure the speed
unsigned long beginMicros, endMicros;
unsigned long byteCount = 0;
bool printWebData = true;  // set to false for better speed measurement
unsigned long timingSoil = 0;   //переменная таймера
unsigned long timeMeasure = 6000; //период включения датчика в мс
int soilPorog; //пороговое значение влажности почвы (от 0 до 1023)
unsigned long timeWater = 5000; //время работы насоса в мс


void getData(int id){
  client.connect(server, 8000);
  if (client.connect(server, 8000)) {
    client.print("GET /sensors/");
    client.print(id);
    client.println(" HTTP/1.1");
    client.println("Host: localhost");
    client.println("Content-Type: application/json");
    client.println("Connection: close");
    client.println();

    // Ожидание ответа
    delay(1000); // Подождем 1 секунду для получения ответа

    // Чтение данных
    while (!client.available()) {
      delay(100);
    }

    // Пропускаем заголовки HTTP-ответа
    while (client.available()) {
      if (client.readStringUntil('\n').equals("\r")) {
        break;
      }
    }

    // Читаем данные из ответа сервера (JSON)
    String jsonData = client.readStringUntil('\n');
    soilPorog = jsonData.toInt(); // Преобразуем строку JSON в число

    Serial.print("Значение поля: ");
    Serial.println(soilPorog);

    client.stop();
  } else {
    Serial.println("Ошибка подключения.");
  }

  delay(5000); // Пауза перед повторным запросом
}


void sendData(float value, int obj){
  client.connect(server, 8000);
  String data = "{\"value\":"+(String)value+",\"idSensor\":"+(String)obj+"}";
  client.println("POST /climate/add HTTP/1.1");
  client.println("Host: localhost");
  client.println("Content-Type: application/json");
  client.print("Content-Length: ");
  client.println(data.length());
  client.println();
  client.println(data);
  client.println("Connection: close");
  client.flush();
  client.stop();
  delay(1000);
}

void setup() {
  // You can use Ethernet.init(pin) to configure the CS pin
  //Ethernet.init(10);  // Most Arduino shields
  //Ethernet.init(5);   // MKR ETH Shield
  //Ethernet.init(0);   // Teensy 2.0
  //Ethernet.init(20);  // Teensy++ 2.0
  //Ethernet.init(15);  // ESP8266 with Adafruit FeatherWing Ethernet
  //Ethernet.init(33);  // ESP32 with Adafruit FeatherWing Ethernet
  pinMode (relay, OUTPUT); //реле в режиме работы "выход"
  pinMode (2, OUTPUT); //контакт для подачи питания на датчик в режиме "выход"
  digitalWrite(relay, LOW);//размыкаем контакты реле
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  Serial.println("Adafruit AHT10/AHT20 demo!");           // Выводим собощение
 
  if (!aht.begin())                                       // Инициализация датчика
  {                                    
    Serial.println("Could not find AHT? Check wiring");   // Отправка сообщения
    while (1) delay(10);                                  // Зацикливаем программу             
  } 
  Serial.println("AHT10 or AHT20 found");

  // start the Ethernet connection:
  Serial.println("Initialize Ethernet with DHCP:");
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // Check for Ethernet hardware present
    if (Ethernet.hardwareStatus() == EthernetNoHardware) {
      Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
      while (true) {
        delay(1); // do nothing, no point running without Ethernet hardware
      }
    }
    if (Ethernet.linkStatus() == LinkOFF) {
      Serial.println("Ethernet cable is not connected.");
    }
    // try to configure using IP address instead of DHCP:
    Ethernet.begin(mac, ip, myDns);
  } else {
    Serial.print("  DHCP assigned IP ");
    Serial.println(Ethernet.localIP());
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.print("connecting to ");
  Serial.print(server);
  Serial.println("...");

  // if you get a connection, report back via serial:
  beginMicros = micros();
}

void loop() {
  if ((millis() - timingSoil) >= timeMeasure)   //каждые минут
  {
    timingSoil = millis();
    digitalWrite (2, HIGH); //включаем питание на датчик
    delay (2000); //ждем 2 секунды

    if (analogRead(soil) >= soilPorog) //если значение влажности больше порога
    {
      digitalWrite(relay, HIGH); //реле замыкает контакты, включается насос
      Serial.println(analogRead(soil));
      delay (timeWater); //проходит 5 секунд работы насоса
      //return; //выход из условия после первой итерации
    }
    Serial.println(analogRead(soil));
    digitalWrite (2, LOW); //выключаем датчик
    digitalWrite(relay, LOW); //реле размыкает контакты, выключен насос
  }
  sensors_event_t humidity, temp;                         // Создаём объект для работы с библиотекой
  aht.getEvent(&humidity, &temp);                         // Считваем показания
  Serial.print("Temperature: ");                          // Отправка сообщения
  Serial.print(temp.temperature);                         // Отпрака температуры
  Serial.println(" degrees C");                           // Отправка сообщения 
  Serial.print("Humidity: ");                             // Отправка сообщения
  Serial.print(humidity.relative_humidity);               // Отправка влажности 
  Serial.println("% rH");
  getData(4);
  sendData(temp.temperature, 1);
  sendData(humidity.relative_humidity, 2);
  sendData((float)analogRead(soil), 8);
  // if there are incoming bytes available
  // from the server, read them and print them:

  // if the server's disconnected, stop the client:
  if (!client.connected()) {
    endMicros = micros();
    Serial.println();
    Serial.println("disconnecting.");
    client.stop();
    // do nothing forevermore:
    delay(5000);
  }
}
