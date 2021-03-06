import 'package:flutter/material.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:google_fonts/google_fonts.dart';
import 'home_controller.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends ModularState<HomePage, HomeController> {
  //use 'controller' variable to access controller

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Play List'),
        backgroundColor: Colors.black,
      ),
      backgroundColor: Colors.black,
      body: ListView.builder(
        itemCount: 10,
        itemBuilder: (_, index) {
          final _photo =
              'https://images-na.ssl-images-amazon.com/images/I/81bqaMrqceL._AC_SX425_.jpg';

          return ListTile(
            onTap: () => Modular.to.pushNamed('/player', arguments: _photo),
            leading: Image.network(_photo),
            title: Text('Californication', style: GoogleFonts.ptSansCaption()),
            subtitle: Text(
              'Red Hot Chilli Peppers',
              style: GoogleFonts.ptSansCaption(),
            ),
            contentPadding: const EdgeInsets.all(10),
          );
        },
      ),
    );
  }
}
