importPackage(java.awt);
importPackage(java.awt.geom);
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));
include(Resources.id("mtr:jcibravo/scripts/main.js"));

///////////////////////////////// DISPLAY /////////////////////////////////
// Displays for the first carriage
const slotCfg = {
  "version": 1,
  "texSize": [1408, 256],
  "slots": [
    {
      "name": "display_front",
      "texArea": [0, 0, 1408, 256],
      "pos": [
        [
          [ -1.055, 1.810, 4.00  ],  // Top left
          [ -1.055, 1.525, 4.00  ],  // Bottom left
          [ -0.420, 1.525, 4.00  ],  // Bottom right
          [ -0.420, 1.810, 4.00  ]   // Top right
        ]
      ],
      
      "offsets": [
        [0.0, 0.0, 1.8575]
      ]
    }
  ]
};

// Displays for the last carriage
const slotReversedCfg = {
  "version": 1,
  "texSize": [1792, 1024],
  "slots": [
    {
      "name": "display_back",
      "texArea": [0, 0, 1408, 256],
      "pos": [
        [
          [ 1.055, 1.810, -4.00  ],  // Top left
          [ 1.055, 1.525, -4.00  ],  // Bottom left
          [ 0.420, 1.525, -4.00  ],  // Bottom right
          [ 0.420, 1.810, -4.00  ]   // Top right
        ]
      ],
      
      "offsets": [
        [0.0, 0.0, -1.8575]
      ]
    }
  ]
};

const dhBase = new DisplayHelper(slotCfg);
const dhReversedBase = new DisplayHelper(slotReversedCfg);
function create(ctx, state, train) {
  state.pisRateLimit = new RateLimit(0.05);
  state.dh = dhBase.create();
  state.dhReversed = dhReversedBase.create();
  //debugVehicle(train);
};
 
function push(ctx, state, train) {
  state.dh.close();
  state.dhReversed.close();
};

const leArchitect = getFontLeArchitect()
function render(ctx, state, train) {
  if (state.pisRateLimit.shouldUpdate()) {
    let g;
    
    [
      { dh: state.dh, graphicsName: "display_front"},
      { dh: state.dhReversed, graphicsName: "display_back"},
    ].forEach((element) => {
        let dh = element.dh;
        g = dh.graphicsFor(element.graphicsName);

        // Set background
        g.setColor(Color.WHITE);
        g.fillRect(0, 0, 1408, 256);
    
        // Destination
        g.setColor(Color.BLACK);
        g.setFont(leArchitect.deriveFont(Font.PLAIN, 130));

        //Lines
        let x = 60;
        let y = 115;
        const width = 1408;
        const text = addNewLines(getDestinationWithoutAccents(train), 16);
        let lineHeight = 115;
        let lines = text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            let lineWidth = g.getFontMetrics().stringWidth(lines[i]);
            let centeredX = (width - lineWidth) / 2;
            g.drawString(lines[i], x, y);
            y += lineHeight;
        };

        // Update stuff
        dh.upload();
      }
    );
  };

  ctx.drawCarModel(state.dh.model, 0, null);
  ctx.drawCarModel(state.dhReversed.model, train.trainCars()-1, null);
};