//
//  CreateMessageViewController.m
//  Rainbros
//
//  Created by Victoria Kwong on 5/18/14.
//  Copyright (c) 2014 Victoria. All rights reserved.
//

#import "CreateMessageViewController.h"

@interface CreateMessageViewController ()
@property (weak, nonatomic) IBOutlet UITextView *messageField;
@property (weak, nonatomic) IBOutlet UISlider *colorPicker;
@property bool typing;
@end

@implementation CreateMessageViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
//    self.messageField.delegate = self;
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
    //    CGAffineTransform trans = CGAffineTransformMakeRotation(M_PI_2);
    //    self.colorPicker.transform = trans;
//    self.messageField.hidden = YES;
    UIImage *sliderLeftTrackImage = [[UIImage imageNamed: @"Slider"] stretchableImageWithLeftCapWidth: 9 topCapHeight: 0];
    UIImage *sliderRightTrackImage = [[UIImage imageNamed: @"Slider"] stretchableImageWithLeftCapWidth: 9 topCapHeight: 0];
    [self.colorPicker setMinimumTrackImage: sliderLeftTrackImage forState: UIControlStateNormal];
    [self.colorPicker setMaximumTrackImage: sliderRightTrackImage forState: UIControlStateNormal];
    float red = (1 - (self.colorPicker.value * 2));
    float blue = 2 * self.colorPicker.value;
    
    float green = (4/3) * self.colorPicker.value;
    UIColor *colorToSet=[UIColor colorWithRed:(red) green:(green) blue:(blue) alpha:1];
    self.view.backgroundColor = colorToSet;
    self.messageField.backgroundColor = colorToSet;
    self.typing = NO;
}



- (IBAction)pickColor:(id)sender {
    NSLog(@"%f", self.colorPicker.value);
    
    float red = 0.0;
    float green = 0.0;
    float blue = 0.0;
    if (self.colorPicker.value <= 0.5) {
        red = (1 - (self.colorPicker.value * 2));
        blue = 2 * self.colorPicker.value;
    } else {
        red = 2 * (self.colorPicker.value - 0.5);
        blue = (1 - ((self.colorPicker.value - 0.5) * 2));
    }
    if (self.colorPicker.value <= 0.75) {
        green = (4/3) * self.colorPicker.value;
    } else {
        green = 1 - ((self.colorPicker.value - 0.75) * (4/3));
    }
    
    UIColor *colorToSet=[UIColor colorWithRed:(red) green:(green) blue:(blue) alpha:1];
    self.view.backgroundColor = colorToSet;
    self.messageField.backgroundColor = colorToSet;
}

- (IBAction)dismissKeyboard:(id)sender {
    if (!self.typing)
        [self.messageField resignFirstResponder];
}

#pragma mark - TextView Delegates

// This method is called once we click inside the textField
-(void)textViewDidBeginEditing:(UITextView *)textView{
    NSLog(@"Text field did begin editing");
}

// This method is called once we complete editing
-(void)textViewDidEndEditing:(UITextView *)textView{
    NSLog(@"Text field ended editing");
    [self.messageField sizeToFit];
    [self scrollViewToCenterOfScreen:self.messageField];
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
    
    if([text isEqualToString:@"\n"]) {
        [textView resignFirstResponder];
        return NO;
    }
    
    NSArray *components = [textView.text componentsSeparatedByString:@" "];
    if (components.count > 1 && [text isEqualToString:@" "]) {
        return NO;
    }
    
    if (textView.text.length + (text.length - range.length) > 50)
        return NO;

    return YES;
}

- (void) scrollViewToCenterOfScreen:(UIView *)theView
{
    CGRect applicationFrame = [[UIScreen mainScreen] applicationFrame];
    CGRect frame = theView.frame;
    frame.origin.x = frame.origin.x;
    frame.origin.y = applicationFrame.origin.y + ((applicationFrame.size.height - 100)/ 2) - (frame.size.height / 2);
    theView.frame = frame;
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
