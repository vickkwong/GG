//
//  ViewAllMessagesViewController.m
//  Rainbros
//
//  Created by Victoria Kwong on 5/20/14.
//  Copyright (c) 2014 Victoria. All rights reserved.
//

#import "ViewAllMessagesViewController.h"
#import "ViewMessageViewController.h"
#import "CreateMessageViewController.h"

@interface ViewAllMessagesViewController ()
@property NSArray *messagesArray;
@end

@implementation ViewAllMessagesViewController

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
    
    [self.navigationController popViewControllerAnimated:YES];
    NSString *getMessagesURL = [[NSString alloc]initWithFormat:@"%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/getMessages.php?username=", self.userName];
    
    NSLog(@"%@", getMessagesURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:getMessagesURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    self.messagesArray = [[NSArray alloc] init];
    self.messagesArray = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&e];
    
    NSLog(@"%@", self.messagesArray);
    
    UITableView *tableView = (UITableView *)[self.view viewWithTag:1];
    [tableView reloadData];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return 2*[self.messagesArray count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Message Cell"];
    if (indexPath.row % 2) {
        UIView *messageBox = (UIView *)[cell viewWithTag:1];
        [messageBox.layer setBorderColor:[UIColor whiteColor].CGColor];
        [messageBox.layer setBorderWidth:5.0f];
        cell.backgroundColor = [UIColor whiteColor];
    } else {
        int row = floor(indexPath.row/2);
        NSDictionary *message = self.messagesArray[row];
        UILabel *label = (UILabel *)[cell viewWithTag:2];
        label.text = [NSString stringWithFormat:@"From %@", message[@"sender"]];
        UIView *messageBox = (UIView *)[cell viewWithTag:1];
        [messageBox.layer setBorderColor:[UIColor blackColor].CGColor];
        [messageBox.layer setBorderWidth:5.0f];
        cell.backgroundColor = [self getUIColorObjectFromHexString:message[@"color"] alpha:1];
        UITextView *actualMessage = (UITextView *)[cell viewWithTag:3];
        actualMessage.text = message[@"message"];
        [actualMessage setTextColor:[UIColor whiteColor]];
        [actualMessage setFont:[UIFont systemFontOfSize:35.0]];

    }
    return cell;
}
//
//- (void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath {
//    if (indexPath.row % 2 == 0) {
//        UIColor *altCellColor = [UIColor colorWithWhite:0.7 alpha:0.1];
//        cell.backgroundColor = altCellColor;
//    }
//}

- (CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if(indexPath.row % 2) {
        return 10.0;
    }
    // "Else"
    return 320.0;
}

- (unsigned int)intFromHexString:(NSString *)hexStr
{
    unsigned int hexInt = 0;
    
    // Create scanner
    NSScanner *scanner = [NSScanner scannerWithString:hexStr];
    
    // Tell scanner to skip the # character
    [scanner setCharactersToBeSkipped:[NSCharacterSet characterSetWithCharactersInString:@"#"]];
    
    // Scan hex value
    [scanner scanHexInt:&hexInt];
    
    return hexInt;
}

- (UIColor *)getUIColorObjectFromHexString:(NSString *)hexStr alpha:(CGFloat)alpha
{
    // Convert hex string to an integer
    unsigned int hexint = [self intFromHexString:hexStr];
    
    // Create color object, specifying alpha as well
    UIColor *color =
    [UIColor colorWithRed:((CGFloat) ((hexint & 0xFF0000) >> 16))/255
                    green:((CGFloat) ((hexint & 0xFF00) >> 8))/255
                     blue:((CGFloat) (hexint & 0xFF))/255
                    alpha:alpha];
    
    return color;
}


#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([segue.identifier isEqualToString:@"createMessage"]) {
        if ([[segue.destinationViewController topViewController] isKindOfClass:[CreateMessageViewController class]]) {
            CreateMessageViewController *dest = (CreateMessageViewController *)[segue.destinationViewController topViewController];
            dest.userName = self.userName;
            //            NSLog(@"%@", self.userName);
//            dest.color = self.color;
//            dest.message = self.messageField.text;
        }
    }
    
}


@end
