var FoMo3Dlong = artifacts.require("FoMo3Dlong");

var SafeMath = artifacts.require("library/SafeMath");
var F3Ddatasets = artifacts.require("library/F3Ddatasets");
var MSFun = artifacts.require("library/MSFun");
var NameFilter = artifacts.require("library/NameFilter");
var UintCompressor = artifacts.require("library/UintCompressor");
var F3DKeysCalcLong = artifacts.require("library/F3DKeysCalcLong");

var F3Devents = artifacts.require("F3Devents");
var PlayerBook = artifacts.require("PlayerBook");
var TeamJust = artifacts.require("TeamJust");


module.exports = function (deployer) {

    deployer.deploy(SafeMath);
    deployer.deploy(F3Ddatasets);
    deployer.deploy(MSFun);
    deployer.deploy(NameFilter);
    deployer.deploy(UintCompressor);
    deployer.deploy(F3DKeysCalcLong);

    deployer.deploy(F3Devents);

    deployer.link(SafeMath, [TeamJust, PlayerBook, FoMo3Dlong]);
    deployer.link(NameFilter, [TeamJust, PlayerBook, FoMo3Dlong]);
    deployer.link(MSFun, [TeamJust, PlayerBook, FoMo3Dlong]);

    deployer.link(F3DKeysCalcLong, FoMo3Dlong);
    deployer.link(F3Ddatasets, FoMo3Dlong);
    deployer.deploy(TeamJust);
    deployer.deploy(PlayerBook);
    deployer.deploy(FoMo3Dlong);

    var team, player, fomo;
    deployer.then(function () {
        return TeamJust.deployed();
    }).then(function (teamJust) {
        team = teamJust;
        return PlayerBook.deployed();
    }).then(function (playerBook) {
        player = playerBook;
        player.setTeam(team.address);
        return FoMo3Dlong.deployed();
    }).then(function (fomo_) {
        fomo = fomo_;
        fomo.setPlayerBook(player.address);
        return TeamJust.deployed();
    }).then(function () {
        fomo.activate({gasPrice: 5500000000});
        return F3Ddatasets.deployed();
    }).then(function () {
        player.addGame(fomo.address, 'fomo',{gasPrice: 6000000000});
    });

};
